import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../src/hooks/useTheme';
import { useThemeStore } from '../src/store/themeStore';
import { 
  Button, 
  Input, 
  Card, 
  Modal, 
  Loader, 
  EmptyState, 
  Toast 
} from '../src/components/ui';

export default function ShowcaseScreen() {
  const { colors, typography, spacing, currentTheme } = useTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={[styles.section, { borderBottomColor: colors.border }]}>
      <Text style={[styles.sectionTitle, { color: colors.text, ...typography.heading3 }]}>
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        
        <View style={styles.themeToggleRow}>
          <Text style={{ color: colors.text, ...typography.heading2 }}>
            Theme: {currentTheme}
          </Text>
          <Switch 
            value={currentTheme === 'dark'} 
            onValueChange={toggleTheme} 
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        </View>

        <Section title="Typography">
          <Text style={{ color: colors.text, ...typography.heading1 }}>Heading 1</Text>
          <Text style={{ color: colors.text, ...typography.heading2 }}>Heading 2</Text>
          <Text style={{ color: colors.text, ...typography.heading3 }}>Heading 3</Text>
          <Text style={{ color: colors.text, ...typography.body }}>Body Text - FinTrack Pro is the best app.</Text>
          <Text style={{ color: colors.textSecondary, ...typography.caption }}>Caption text.</Text>
        </Section>

        <Section title="Buttons">
          <View style={styles.row}>
            <Button title="Primary" onPress={() => {}} fullWidth={false} />
            <Button title="Secondary" variant="secondary" onPress={() => {}} fullWidth={false} />
          </View>
          <View style={[styles.row, { marginTop: spacing.md }]}>
            <Button title="Outline" variant="outline" onPress={() => {}} fullWidth={false} />
            <Button title="Danger" variant="danger" onPress={() => {}} fullWidth={false} />
          </View>
          <View style={[styles.row, { marginTop: spacing.md }]}>
            <Button title="With Icon" icon="plus" onPress={() => {}} fullWidth={false} />
            <Button title="Loading" loading onPress={() => {}} fullWidth={false} />
          </View>
          <Button title="Disabled Block" disabled onPress={() => {}} style={{ marginTop: spacing.md }} />
        </Section>

        <Section title="Inputs">
          <Input label="Email Address" placeholder="john@example.com" icon="mail" />
          <Input label="Password" placeholder="Enter password" isPassword icon="lock" />
          <Input label="Amount" placeholder="0.00" error="Amount cannot be negative" />
        </Section>

        <Section title="Cards">
          <Card title="Total Balance" subtitle="Updated just now" onPress={() => {}}>
            <Text style={{ color: colors.primary, ...typography.heading1 }}>$12,450.00</Text>
          </Card>
        </Section>

        <Section title="Interactive Components">
          <Button title="Open Modal" onPress={() => setModalVisible(true)} variant="secondary" />
          <View style={{ height: spacing.md }} />
          <Button title="Show Toast" onPress={() => setToastVisible(true)} variant="outline" />
          <View style={{ height: spacing.md }} />
          <Button title="Test Full Loader" onPress={triggerLoading} />
        </Section>

        <Section title="Empty State">
          <Card>
            <EmptyState 
              title="No Transactions Yet" 
              description="When you spend or receive money, it will show up here."
              icon="credit-card"
              actionTitle="Add Transaction"
              onAction={() => {}}
            />
          </Card>
        </Section>

      </ScrollView>

      {/* Overlays */}
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title="Add Budget">
        <Input label="Budget Name" placeholder="e.g. Groceries" />
        <Input label="Limit" placeholder="$0.00" />
        <Button title="Save Budget" onPress={() => setModalVisible(false)} style={{ marginTop: spacing.md }} />
      </Modal>

      <Toast 
        visible={toastVisible} 
        message="Transaction saved successfully!" 
        onHide={() => setToastVisible(false)} 
      />

      {loading && <Loader fullScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  themeToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
    borderBottomWidth: 1,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});
