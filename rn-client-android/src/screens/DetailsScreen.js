import { Button, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const DetailsScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text_header}>Alerts Screen</Text>
			<Text style={styles.text_footer}>Showing alerts</Text>
		</View>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text_header: {
		fontSize: 24,
	},
	text_footer: {
		fontSize: 18,
	},
});
