import React from 'react';
import { Text, View, Pressable, Linking, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import theme from '../theme';
import ScreenContainer from '../components/ScreenContainer';

const PRIVACY_POLICY_URL = 'https://riflevolunteer.github.io/velo-describe/privacy-policy.html';
const CONTACT_EMAIL = 'riflevolunteer73@gmail.com';

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.eyebrow}>{title}</Text>
    {children}
  </View>
);

const Paragraph = ({ children }) => <Text style={styles.body}>{children}</Text>;

const Bullet = ({ label, children }) => (
  <View style={styles.bullet}>
    <Text style={styles.bulletDot}>{'•'}</Text>
    <Text style={[styles.body, styles.bulletText]}>
      <Text style={styles.bold}>{label}</Text>
      {children}
    </Text>
  </View>
);

const Link = ({ onPress, children }) => (
  <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.linkPressed}>
    <Text style={styles.link}>{children}</Text>
  </Pressable>
);

const AboutScreen = () => {
  const version = Constants.expoConfig?.version;
  const updateId = Updates.isEmbeddedLaunch ? null : Updates.updateId;

  return (
    <ScreenContainer>
      <Section title="What Velo Scout does">
        <Paragraph>
          A reference guide to vintage bikes and the parts they were built with. Find a model from the original catalogues and see exactly how it was specified, then dig into the classic components behind it.
        </Paragraph>
      </Section>

      <Section title="Bikes">
        <Bullet label="Search">
          {' — enter a model or brand (two characters is enough, handy for codes like "Z 77").'}
        </Bullet>
        <Bullet label="Browse">
          {' — pick a manufacturer, then a model, for its full spec sheet.'}
        </Bullet>
        <Bullet label="Linked parts">
          {' — blue spec lines with an arrow match a component in our catalogue. Tap to open it. "None Specified" means the catalogue listed nothing.'}
        </Bullet>
      </Section>

      <Section title="Components">
        <Bullet label="Search">
          {' — enter at least three characters of a name, brand or model.'}
        </Bullet>
        <Bullet label="Browse">
          {' — choose a category, then a brand.'}
        </Bullet>
        <Bullet label="Groupsets">
          {' — tap a group name (Campagnolo Athena, Shimano 600…) to see the rest of that family.'}
        </Bullet>
      </Section>

      <Section title="Marketplace">
        <Paragraph>
          The Marketplace button on a component page shows current listings for that part. Prices are asking prices, not sold prices, so treat them as a guide.
        </Paragraph>
        <Paragraph>
          Listings link out to eBay. Velo Scout takes part in the eBay Partner Network, so we may earn a small commission on purchases at no extra cost to you. It doesn't affect which listings appear.
        </Paragraph>
      </Section>

      <Section title="About the data">
        <Paragraph>
          Bike specs are transcribed from original manufacturer catalogues, including the odd gap or period spelling. Component details come from public catalogues and reference sources, including VeloBase.com. Coverage is strongest for 1970s–1990s road bikes, and some entries lack years or images. Spotted a mistake? Get in touch below.
        </Paragraph>
      </Section>

      <Section title="Privacy">
        <Paragraph>
          Velo Scout doesn't need an account and doesn't collect personal information.
        </Paragraph>
        <Link onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>Read the full privacy policy {'→'}</Link>
      </Section>

      <Section title="Contact">
        <Link onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}`)}>{CONTACT_EMAIL}</Link>
      </Section>

      <View style={styles.divider} />
      <Text style={styles.caption}>
        {version ? `Version ${version}` : 'Development build'}
        {updateId ? `  ·  Update ${updateId.slice(0, 8)}` : ''}
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.lg,
  },
  eyebrow: {
    ...theme.typography.eyebrow,
    marginBottom: theme.spacing.sm,
  },
  body: {
    ...theme.typography.body,
    marginBottom: theme.spacing.sm,
  },
  bulletText: {
    flex: 1,
  },
  bold: {
    fontWeight: '600',
  },
  bullet: {
    flexDirection: 'row',
    paddingRight: theme.spacing.md,
  },
  bulletDot: {
    ...theme.typography.body,
    color: theme.colors.amber,
    marginRight: theme.spacing.sm,
  },
  link: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  linkPressed: {
    opacity: 0.6,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },
  caption: {
    ...theme.typography.caption,
  },
});

export default AboutScreen;
