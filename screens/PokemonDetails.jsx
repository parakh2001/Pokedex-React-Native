import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const PokemonDetails = ({ route }) => {
    const { pokemon, index } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
            .then(response => response.json())
            .then(data => {
                setDetails(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: details.sprites.front_default }} style={styles.image} />
            <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
            <Text style={styles.info}>Height: {details.height}</Text>
            <Text style={styles.info}>Weight: {details.weight}</Text>
            <Text style={styles.info}>Base Experience: {details.base_experience}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    image: { width: 150, height: 150 },
    name: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
    info: { fontSize: 18, marginTop: 5 }
});

export default PokemonDetails;