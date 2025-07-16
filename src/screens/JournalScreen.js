import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const JournalScreen = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState([]);

  const moods = [
    { name: 'Excited', emoji: '😄', color: colors.primary },
    { name: 'Happy', emoji: '😊', color: colors.success },
    { name: 'Neutral', emoji: '😐', color: colors.gray[400] },
    { name: 'Sad', emoji: '😢', color: colors.secondary },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleAddEntry = () => {
    setIsModalVisible(true);
  };

  const handleSaveEntry = () => {
    if (selectedMood && journalText.trim()) {
      const newEntry = {
        id: Date.now(),
        mood: selectedMood,
        text: journalText,
        date: new Date().toLocaleDateString(),
      };
      setEntries([newEntry, ...entries]);
      setJournalText('');
      setSelectedMood(null);
      setIsModalVisible(false);
    }
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <LinearGradient colors={colors.backgroundGradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Journal</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.moodCard}>
            <Text style={styles.moodTitle}>How are you today?</Text>
            <View style={styles.moodSelector}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.name}
                  style={[
                    styles.moodButton,
                    selectedMood?.name === mood.name && styles.moodButtonSelected,
                  ]}
                  onPress={() => handleMoodSelect(mood)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodName}>{mood.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>History</Text>
              {entries.length > 0 && (
                <Text style={styles.entryCount}>{entries.length} entries</Text>
              )}
            </View>

            {entries.length > 0 ? (
              entries.map((entry) => (
                <Card key={entry.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryMood}>
                      <View style={[styles.moodIndicator, { backgroundColor: entry.mood.color + '20' }]}>
                        <Text style={styles.entryMoodEmoji}>{entry.mood.emoji}</Text>
                      </View>
                      <View>
                        <Text style={styles.entryMoodName}>{entry.mood.name}</Text>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteEntry(entry.id)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.entryText}>{entry.text}</Text>
                </Card>
              ))
            ) : (
              <Card style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>No journal entries yet.</Text>
                <Text style={styles.emptyStateText}>
                  Add your first entry by clicking the button below!
                </Text>
              </Card>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Add Entry"
            onPress={handleAddEntry}
            style={styles.addButton}
          />
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>New Journal Entry</Text>

              <View style={styles.modalMoodSection}>
                <Text style={styles.modalMoodLabel}>How are you feeling?</Text>
                <View style={styles.modalMoodSelector}>
                  {moods.map((mood) => (
                    <TouchableOpacity
                      key={mood.name}
                      style={[
                        styles.modalMoodButton,
                        selectedMood?.name === mood.name && styles.modalMoodButtonSelected,
                      ]}
                      onPress={() => handleMoodSelect(mood)}
                    >
                      <Text style={styles.modalMoodEmoji}>{mood.emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Input
                label="What's on your mind?"
                placeholder="Write your thoughts here..."
                value={journalText}
                onChangeText={setJournalText}
                multiline
                numberOfLines={4}
                style={styles.modalInput}
              />

              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={() => setIsModalVisible(false)}
                  style={styles.modalCancelButton}
                />
                <Button
                  title="Save"
                  onPress={handleSaveEntry}
                  disabled={!selectedMood || !journalText.trim()}
                  style={styles.modalSaveButton}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  backButtonText: {
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  moodCard: {
    marginBottom: spacing.lg,
  },
  moodTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 20,
  },
  moodButtonSelected: {
    backgroundColor: colors.primaryLight,
  },
  moodEmoji: {
    fontSize: 30,
    marginBottom: spacing.xs,
  },
  moodName: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  historySection: {
    marginBottom: spacing['2xl'],
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  historyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  entryCount: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  entryCard: {
    marginBottom: spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  entryMoodEmoji: {
    fontSize: 20,
  },
  entryMoodName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    fontFamily: typography.fontFamily,
  },
  entryDate: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  entryText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.sizes.sm * typography.lineHeights.relaxed,
    fontFamily: typography.fontFamily,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily,
  },
  emptyStateText: {
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  addButton: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: spacing.lg,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
  },
  modalMoodSection: {
    marginBottom: spacing.lg,
  },
  modalMoodLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily,
  },
  modalMoodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalMoodButton: {
    padding: spacing.sm,
    borderRadius: 20,
  },
  modalMoodButtonSelected: {
    backgroundColor: colors.primaryLight,
  },
  modalMoodEmoji: {
    fontSize: 24,
  },
  modalInput: {
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  modalSaveButton: {
    flex: 1,
    marginLeft: spacing.sm,
  },
});

export default JournalScreen;