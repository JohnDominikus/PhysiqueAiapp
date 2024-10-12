// SignUp.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SplashScreen, useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

const SignUp = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={require('../assets/images/phylogos.png')} style={styles.logo} />
        <ActivityIndicator size="large" color="#FFB200" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Sign Up</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '50%' }]} />
        </View>

        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Full Name" />
        </View>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={20} style={styles.icon} />
          <TextInput style={styles.input} placeholder="Username" />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            keyboardType="email-address" 
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            secureTextEntry 
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Confirm Password" 
            secureTextEntry 
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/PersonalInformation')} // Navigate to Personal Information page
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/SignIn')} style={styles.link}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222227',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background to white
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF', // Make the container white
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: 'SpaceMono-Regular',
    color: '#222', // Darker color for the title
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFB200',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // White background for input fields
  },
  icon: {
    paddingHorizontal: 10,
    color: 'gray',
  },
  input: {
    flex: 1,
    height: 50,
    color: '#222', // Dark text color for readability
    fontSize: 16,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: '#FFB200', // Bright color for the register button
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'SpaceMono-Regular',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#1F4E5F',
    textAlign: 'center',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
  },
});

export default SignUp;
