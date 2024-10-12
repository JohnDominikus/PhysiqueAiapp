import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Home() {
  const router = useRouter();

  // Load the custom font
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'), // Add custom font path here
  });

  // Show loading spinner until fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB200" />
      </View>
    );
  }

  // Main content with Sign In, Sign Up, and logo
  return (
    <View style={styles.background}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Logo */}
        <Image 
          source={require('../assets/images/phylogos.png')} // Add your logo path here
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>Welcome to FitLife</Text>
        
        {/* Slogan */}
        <Text style={styles.slogan}>Your journey to fitness starts here!</Text>
        
        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/SignIn')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222227', // Background color for loading screen
  },
  background: {
    flex: 1,
    backgroundColor: '#222227', // Background color for the app
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Added padding for better spacing
  },
  logo: {
    width: 100, // Logo width
    height: 100, // Logo height
    marginBottom: 20, // Space below the logo
  },
  title: {
    fontSize: 32,
    fontFamily: 'SpaceMono-Regular',
    color: '#FFFFFF', // White text for title
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow for visibility
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    marginBottom: 10, // Space below the title
    textAlign: 'center', // Center text
  },
  slogan: {
    fontSize: 16,
    fontFamily: 'SpaceMono-Regular',
    color: '#FFFFFF', // White text for slogan
    marginBottom: 30, // Space below the slogan
    textAlign: 'center', // Center the slogan text
  },
  signInButton: {
    backgroundColor: '#1F7357', // Sign In button color
    padding: 15,
    borderRadius: 5,
    width: '80%', // Button width
    alignItems: 'center',
    marginVertical: 10, // Space between buttons
  },
  signUpButton: {
    backgroundColor: '#FFB200', // Sign Up button color
    padding: 15,
    borderRadius: 5,
    width: '80%', // Button width
    alignItems: 'center',
    marginVertical: 10, // Space between buttons
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 18,
    fontFamily: 'SpaceMono-Regular',
  },
});
