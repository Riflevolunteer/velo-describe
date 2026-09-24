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
          Velo Scout is a reference guide to classic bicycle components: cranksets, derailleurs, brakes, hubs, saddles and more, from the 1940s onward. Look up a part to find out who made it, when it was produced, and which groupset it belonged to.
        </Paragraph>
      </Section>

      <Section title="Finding a component">
        <Bullet label="Search">
          {' — type at least three characters of a name, brand or model into the box on the home screen. Results update as you type.'}
        </Bullet>
        <Bullet label="Browse">
          {' — tap Browse Categories, choose a component type, then a brand, to see everything we have listed.'}
        </Bullet>
        <Bullet label="Groupsets">
          {' — when a part belongs to a named group (Campagnolo Athena, Shimano 600, and so on), tap the group name on its detail page to see the other components in that family.'}
        </Bullet>
      </Section>

      <Section title="Price Check">
        <Paragraph>
          Each component page has a Price Check button. It searches current marketplace listings for that part and shows an average asking price alongside the top matching listings. Prices are what sellers are asking, not what items have sold for, and they change constantly, so treat them as a guide.
        </Paragraph>
        <Paragraph>
          Listings link out to eBay. Velo Scout takes part in the eBay Partner Network; if you buy something through one of these links we may earn a small commission at no extra cost to you. This doesn't affect which listings are shown.
        </Paragraph>
      </Section>

      <Section title="About the data">
        <Paragraph>
          Component details are compiled from public catalogues and reference sources, including VeloBase.com. Coverage is broadest for road components from the 1970s to the 1990s, and some entries are missing years or images. Spotted a mistake? Get in touch below.
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
