import {Color} from 'src/themeTypes'
import {ProposalsTagKeys} from 'src/types'

export type ProposalsTagType = [
  ProposalsTagKeys,
  string,
  Color | undefined,
  Color,
  string | undefined,
]

export const ProposalsTags: ProposalsTagType[] = [
  ['all', 'All', Color.graphicBase1, Color.textBase3, undefined],
  ['voting', 'Voting', Color.graphicBase1, Color.textBase3, 'clock-outline'],
  ['deposited', 'Deposited', Color.graphicBase1, Color.textBase3, 'cash-fast'],
  ['passed', 'Passed', undefined, Color.textGreen1, 'check'],
  ['rejected', 'Rejected', undefined, Color.textRed1, 'close-circle'],
]
