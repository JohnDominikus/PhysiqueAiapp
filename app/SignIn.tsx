import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SplashScreen, useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

export default function SignIn() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [loading, setLoading] = useState(true);
  
  // State to track input focus
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
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
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFB200" />
        </TouchableOpacity>

        <Image source={require('../assets/images/phylogos.png')} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>

        {/* Email Input */}
        <View style={[styles.inputContainer, { borderColor: isEmailFocused ? '#FFB200' : '#ccc' }]}>
          <MaterialIcons name="email" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)}  // Set focus state
            onBlur={() => setEmailFocused(false)}   // Reset focus state
          />
        </View>

        {/* Password Input */}
        <View style={[styles.inputContainer, { borderColor: isPasswordFocused ? '#FFB200' : '#ccc' }]}>
          <MaterialIcons name="lock" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}  // Set focus state
            onBlur={() => setPasswordFocused(false)}   // Reset focus state
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => { /* Handle login */ }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/SignUp')} style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
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
    backgroundColor: '#fff', // Set loading background to white
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  background: {
    flex: 1,
    backgroundColor: '#fff', // Set the background to white
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
    backgroundColor: '#fff', // Set container background to white
    borderRadius: 15, // More rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SpaceMono-Regular',
    color: '#FFB200', // Use a bright color for the title
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2, // Increased border width for better visibility
    marginBottom: 15,
    borderRadius: 10, // More rounded corners
    backgroundColor: 'transparent',
  },
  icon: {
    paddingHorizontal: 10,
    color: '#444', // Change icon color to a darker shade for contrast
  },
  input: {
    flex: 1,
    height: 50,
    color: '#222', // Change text color to dark gray
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#FFB200', // Bright yellow for the button
    padding: 15,
    borderRadius: 10, // More rounded corners
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#222', // Dark color for button text
    fontSize: 18,
    fontFamily: 'SpaceMono-Regular',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#FFB200', // Bright color for link text
    textAlign: 'center',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
