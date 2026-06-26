import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect immediately to the splash screen on launch
  return <Redirect href="/splash" />;
}
