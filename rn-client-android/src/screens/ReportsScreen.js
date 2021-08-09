import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const BookmarkScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Reports</Text>
		</View>
	);
};

export default BookmarkScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
