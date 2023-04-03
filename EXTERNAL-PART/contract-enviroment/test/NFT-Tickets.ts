import {anyValue} from '@nomicfoundation/hardhat-chai-matchers/withArgs'
import {expect} from 'chai'
import {ethers} from 'hardhat'

import {NftTickets} from '../typechain-types'

const TICKETS_AMOUNT = 500
const IPFS_HASH = 'ipfs-hash'

describe('NFT-Tickets', function () {
  let Tickets: NftTickets

  beforeEach(async () => {
    // const accounts = await ethers.getSigners()

    Tickets = (await (
      await ethers.getContractFactory('NftTickets')
    ).deploy()) as NftTickets
    // TicketsMarketplace = (await (
    //   await ethers.getContractFactory('NftTicketsMarketplace')
    // ).deploy(Tickets.address)) as NftTicketsMarketplace
  })

  describe('General tests', function () {
    it('Сreating not valid tickets', async function () {
      expect(Tickets.createTicket(500, '')).to.be.revertedWithCustomError(
        Tickets,
        'ipfsHashShouldNotBeEmptyString',
      )
      // @ts-ignore
      expect(Tickets.createTicket(500)).to.be.revertedWithCustomError(
        Tickets,
        'ipfsHashShouldNotBeEmptyString',
      )

      expect(
        Tickets.createTicket(0, 'heofu382h2'),
      ).to.be.revertedWithCustomError(Tickets, 'AmountMustBeAboveZero')
    })
    it('Сreating tickets', async function () {
      const accounts = await ethers.getSigners()
      const ticketID = 1

      expect(Tickets.createTicket(TICKETS_AMOUNT, IPFS_HASH))
        .to.emit(Tickets, 'TicketCreated')
        .withArgs(accounts[0], anyValue, TICKETS_AMOUNT, IPFS_HASH)

      expect(await Tickets.balanceOf(accounts[0].address, ticketID)).to.equal(
        TICKETS_AMOUNT,
      )
      expect(await Tickets.uri(ticketID)).to.equal(
        `https://ipfs.io/ipfs/${IPFS_HASH}`,
      )
      expect(await Tickets.getTicketCreator(ticketID)).to.equal(
        accounts[0].address,
      )
    })

    it('Assign ticket collectors', async function () {
      const [, collector, guest] = await ethers.getSigners()
      Tickets.createTicket(TICKETS_AMOUNT, IPFS_HASH)

      expect(
        Tickets.connect(guest).changeTicketCollectors(
          1,
          collector.address,
          true,
        ),
      ).to.be.revertedWithCustomError(Tickets, 'OnlyStaffOwnerCanDoThis')
      expect(await Tickets.connect(collector).canCollectTicket(1)).to.be.false

      expect(Tickets.changeTicketCollectors(1, collector.address, true))
        .to.emit(Tickets, 'StaffCollectorsChanged')
        .withArgs(1, collector.address, true)

      expect(await Tickets.connect(collector).canCollectTicket(1)).to.be.true
    })

    it('Use tickets test', async function () {
      const [owner, collector, guest1, guest2] = await ethers.getSigners()
      const ticketId = 1

      // Подготовка для тестирования логики использования билетов
      await Tickets.createTicket(TICKETS_AMOUNT, IPFS_HASH)
      await Tickets.changeTicketCollectors(ticketId, collector.address, true)
      await Tickets.safeTransferFrom(
        owner.address,
        guest1.address,
        ticketId,
        20,
        '0x',
      )

      const amount = 5
      const useTicketsPromise = () =>
        Tickets.connect(guest1).useTickets(collector.address, ticketId, amount)

      // Проверяем событие(важно для graph)
      expect(useTicketsPromise())
        .to.emit(Tickets, 'TicketsUsed')
        .withArgs(anyValue, collector.address, ticketId, amount)

      // Проверка уникальности сообщения(благодаря nouces)
      const firstFiveTicketsMess = await useTicketsPromise()
      const secondFiveTicketsMess = await useTicketsPromise()

      expect(firstFiveTicketsMess).to.be.string
      expect(firstFiveTicketsMess).to.not.equal(secondFiveTicketsMess)

      // Проверяем что баланс билетов изменился
      expect(await Tickets.balanceOf(guest1.address, ticketId)).to.equal(5)

      // Проверяем случай если сборщик билетов указан неверно
      // (вдруг мошенник притвориться билетером)
      expect(
        Tickets.connect(guest1).useTickets(guest2.address, ticketId, amount),
      ).to.revertedWithCustomError(
        Tickets,
        'TicketsCanOnlyBeAcceptedByTheStaffCollectors',
      )
    })

    it('Tickets verifying test', async function () {
      const [owner, collector, guest] = await ethers.getSigners()
      const ticketId = 1

      // Подготовка для тестирования логики использования билетов
      await Tickets.createTicket(TICKETS_AMOUNT, IPFS_HASH)
      await Tickets.changeTicketCollectors(ticketId, collector.address, true)
      await Tickets.safeTransferFrom(
        owner.address,
        guest.address,
        ticketId,
        20,
        '0x',
      )

      // Используем билетики и получаем сообщение которое в приложении
      // будет QR кодом
      const {message, key} = await Tickets.connect(guest).callStatic.useTickets(
        collector.address,
        ticketId,
        20,
      )

      // Без таймаута activeVerifications маппинг не успевает обновиться
      setTimeout(async () => {
        const signature = await guest.signMessage(
          ethers.utils.arrayify(message),
        )

        // Проверка того что именно данный человек перевел билеты билета
        expect(
          await Tickets.connect(collector).callStatic.verifyTickets(
            ticketId,
            guest.address,
            message,
            signature,
            key,
          ),
        ).to.equal(true)
      }, 0)
    })
  })
})
