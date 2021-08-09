import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const SupportScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Check Up Screen</Text>
		</View>
	);
};

export default SupportScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
