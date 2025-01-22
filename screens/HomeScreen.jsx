// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PokemonCard from '../components/PokemonCard';

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
        <FlatList
            data={pokemonList}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item, index }) => (
                <PokemonCard pokemon={item} index={index + 1} navigation={navigation} />
            )}
            windowSize={10} // Only keeps 10 items in memory at a time
            initialNumToRender={20} // Initially renders only 20 items
            maxToRenderPerBatch={15} // Renders 15 items per batch
            updateCellsBatchingPeriod={50} // Reduces update frequency
            removeClippedSubviews={true} // Removes items outside of view
        />
    );
};

const styles = StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default HomeScreen;
