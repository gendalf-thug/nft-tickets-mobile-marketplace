import React from 'react'

import {FlatList, StyleSheet, View} from 'react-native'

import {ProposalVotingEmpty} from 'src/components/proposalVotingEmpty'
import {Background, CustomHeader, Spacer} from 'src/components/ui'
import {ProposalsCroppedList, ProposalsTagKeys} from 'src/types'
import {ProposalsTagType, ProposalsTags} from 'src/variables/proposal'

import {VotingCard} from './VotingCard'

import {GovernanceTag} from '../ui/GovernanceTag'

export interface HomeGovernanceProps {
  proposals: ProposalsCroppedList
  statusFilter: ProposalsTagKeys
  onPressCard?: (id: number) => void
  onRefresh?: () => void
  refreshing?: boolean
  loading?: boolean
  onSelect?: (tag: ProposalsTagType) => () => void
  onSearchChange?: (text: string) => void
}

export function HomeGovernance({
  proposals,
  statusFilter,
  onPressCard,
  onRefresh,
  refreshing,
  loading,
  onSelect,
}: HomeGovernanceProps) {
  const listHeader = () => <Spacer height={12} />
  const listSeparator = () => <Spacer height={24} />

  return (
    <Background>
      <CustomHeader
        title="Governance"
        disabledLeft
        iconRight="shield-outline"
      />
      <Spacer height={12} />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
          data={ProposalsTags}
          keyExtractor={item => item[0]}
          renderItem={({item}) => {
            const [tagKey, tagTitle] = item
            const tagVariant = statusFilter === tagKey ? 'active' : 'inactive'
            return (
              <GovernanceTag
                key={tagKey}
                text={tagTitle}
                onPress={onSelect?.(item)}
                tagVariant={tagVariant}
              />
            )
          }}
        />
      </View>
      <Spacer height={12} />
      {loading ? null : (
        <FlatList
          ListEmptyComponent={<ProposalVotingEmpty />}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={listHeader}
          renderItem={({item}) => (
            <VotingCard
              id={item.id}
              onPress={onPressCard}
              status={item.status as ProposalsTagKeys}
            />
          )}
          ItemSeparatorComponent={listSeparator}
          data={proposals}
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          keyExtractor={item => String(item.id)}
        />
      )}
      <Spacer height={12} />
    </Background>
  )
}

const styles = StyleSheet.create({
  tagsContainer: {
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
})
