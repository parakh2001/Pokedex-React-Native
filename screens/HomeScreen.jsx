import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper'; // AppBar from react-native-paper
import PokemonCard from '../components/PokemonCard';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const HomeScreen = ({ navigation }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
            .then(response => response.json())
            .then(data => {
                setPokemonList(data.results);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Appbar with the title "Pokedex" */}
            <Appbar.Header style={styles.appBar}>
                <LinearGradient
                    colors={['#6a11cb', '#2575fc']} // Gradient colors
                    style={styles.gradientBackground}
                >
                    <Appbar.Content title="Pokedex" titleStyle={styles.titleStyle} />
                    {/* Optional icons */}
                    <Appbar.Action icon="magnify" onPress={() => { /* Search function */ }} />
                    <Appbar.Action icon="menu" onPress={() => { /* Menu function */ }} />
                </LinearGradient>
            </Appbar.Header>

            {/* Pokemon List */}
            <FlatList
                data={pokemonList}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <PokemonCard pokemon={item} index={index + 1} navigation={navigation} />
                )}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    appBar: { elevation: 4 }, // Add elevation to give the app bar a shadow effect
    gradientBackground: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    titleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContainer: { padding: 10, justifyContent: 'center' }
});

export default HomeScreen;
