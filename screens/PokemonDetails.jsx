import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const PokemonDetails = ({ route }) => {
    const { pokemon, index } = route.params;
    const [details, setDetails] = useState(null);
    const [evolution, setEvolution] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
                const pokemonData = await pokemonResponse.json();
                setDetails(pokemonData);

                const speciesResponse = await fetch(pokemonData.species.url);
                const speciesData = await speciesResponse.json();
                const evolutionResponse = await fetch(speciesData.evolution_chain.url);
                const evolutionData = await evolutionResponse.json();
                setEvolution(evolutionData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [index]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#ffcb2b" />
            </View>
        );
    }

    const renderEvolution = (evolutionData) => {
        if (!evolutionData) return null;

        return (
            <View style={styles.evolutionRow}>
                <Text style={styles.evolutionStage}>
                    {evolutionData.species?.name ? evolutionData.species.name.toUpperCase() : 'N/A'}
                    {evolutionData.evolution_details[0]?.min_level ? ` (Level: ${evolutionData.evolution_details[0].min_level})` : ''}
                </Text>
                {evolutionData.evolves_to?.length > 0 && (
                    <View style={styles.evolutionRow}>
                        {evolutionData.evolves_to.map((evo, idx) => (
                            <View key={idx} style={styles.evolutionStage}>
                                {renderEvolution(evo)}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Image and Name */}
                <Image source={{ uri: details.sprites?.front_default }} style={styles.image} />
                <Text style={styles.name}>{pokemon.name?.toUpperCase() || 'N/A'}</Text>

                {/* Height, Weight, Base Experience */}
                <View style={styles.statsContainer}>
                    <Text style={styles.info}>Height: {details.height ? details.height / 10 : 'N/A'} m</Text>
                    <Text style={styles.info}>Weight: {details.weight ? details.weight / 10 : 'N/A'} kg</Text>
                    <Text style={styles.info}>Base Experience: {details.base_experience || 'N/A'}</Text>
                </View>

                {/* Types */}
                <Text style={styles.sectionTitle}>Type(s):</Text>
                <View style={styles.row}>
                    {details.types?.map((typeObj, idx) => (
                        <Text key={idx} style={[styles.type, { backgroundColor: getTypeColor(typeObj.type.name) }]}>
                            {typeObj.type.name.toUpperCase()}
                        </Text>
                    ))}
                </View>

                {/* Abilities */}
                <Text style={styles.sectionTitle}>Abilities:</Text>
                <View style={styles.row}>
                    {details.abilities?.map((abilityObj, idx) => (
                        <Text key={idx} style={[
                            styles.ability,
                            abilityObj.is_hidden ? styles.hiddenAbility : null
                        ]}>
                            {abilityObj.ability?.name.toUpperCase()} {abilityObj.is_hidden ? '(Hidden)' : ''}
                        </Text>
                    ))}
                </View>

                {/* Moves */}
                <Text style={styles.sectionTitle}>Moves:</Text>
                {details.moves?.slice(0, 10).map((moveObj, idx) => ( // Displaying only 10 moves
                    <View key={idx} style={styles.moveContainer}>
                        <Text style={styles.move}>
                            {moveObj.move?.name.toUpperCase()}
                            <Text style={styles.moveType}> - {moveObj.move?.type?.name.toUpperCase() || 'N/A'}</Text>
                            (Level: {moveObj.version_group_details[0]?.level_learned_at || 'N/A'})
                        </Text>
                    </View>
                ))}

                {/* Evolution Chain */}
                {evolution && (
                    <>
                        <Text style={styles.sectionTitle}>Evolution Chain:</Text>
                        <View style={styles.evolutionContainer}>
                            {renderEvolution(evolution.chain)}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

// Helper function to get color based on Pokémon type
const getTypeColor = (type) => {
    const colors = {
        fire: '#fba500',
        water: '#4a90e2',
        grass: '#7cc576',
        electric: '#f1c40f',
        psychic: '#9b59b6',
        normal: '#b8b8b8',
        bug: '#27ae60',
        dragon: '#e74c3c',
        poison: '#8e44ad',
        ghost: '#34495e',
        flying: '#2ecc71',
        fighting: '#e74c3c',
        ground: '#d35400',
        steel: '#95a5a6',
        fairy: '#f39c12'
    };
    return colors[type] || '#ccc';
};

const styles = StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContainer: { paddingBottom: 50, backgroundColor: '#f5f5f5' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    image: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
    name: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
    statsContainer: { alignItems: 'center' },
    info: { fontSize: 18, marginTop: 8, color: '#7f8c8d' },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, color: '#2c3e50' },
    row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 },
    type: { padding: 8, margin: 5, borderRadius: 5, color: '#fff', fontWeight: 'bold' },
    ability: { backgroundColor: '#2a9d8f', padding: 8, margin: 5, borderRadius: 5, color: '#fff', fontWeight: 'bold' },
    hiddenAbility: { backgroundColor: '#264653' }, // Darker color for hidden abilities
    moveContainer: { marginTop: 8 },
    move: { fontSize: 16, color: '#e76f51' },
    moveType: { fontSize: 14, color: '#7f8c8d' },
    evolutionContainer: { marginTop: 20 },
    evolutionRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 },
    evolutionStage: { fontSize: 18, backgroundColor: '#ffb8b8', padding: 10, margin: 5, borderRadius: 8, color: '#333', fontWeight: 'bold' },
});

export default PokemonDetails;
