import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// --- PANTALLAS ---
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal (Home)</Text>
      <Button
        title="Ir a Detalle"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Detalles</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
    </View>
  );
}

// --- NAVEGADORES STACK ---
const NativeStack = createNativeStackNavigator();
function NativeStackNavigator() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio (Native Stack)" }}
      />
      <NativeStack.Screen name="Details" component={DetailsScreen} />
    </NativeStack.Navigator>
  );
}

const Stack = createStackNavigator();
function JSStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio (JS Stack)" }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// --- BOTTOM TABS ---
const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider style={styles.wrapper}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { height: 60, backgroundColor: "#eef2f5" },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 18,
            },
            tabBarIconStyle: { display: "none" },
          }}
        >
          <Tab.Screen
            name="Native Stack"
            component={NativeStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="JS Stack"
            component={JSStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: Platform.OS === "web" ? "100vh" : "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

registerRootComponent(App);
