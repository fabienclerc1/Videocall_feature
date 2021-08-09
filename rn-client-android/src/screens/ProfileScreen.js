import {
	Button,
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import React from 'react';

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<View style={styles.card_small}>
					<Text style={styles.text_header}>Profile</Text>
				</View>
				<View style={styles.card_small}>
					<Text style={styles.text_header}>Reports</Text>
				</View>
				<View style={styles.card_small}>
					<Text style={styles.text_header}>Check Up</Text>
				</View>
				<View style={styles.card_small}>
					<Text style={styles.text_header}>Settings</Text>
				</View>
				<View style={styles.card_small}>
					<Text style={styles.text_header}>Sign Out</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default ProfileScreen;

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
		// justifyContent: 'flex-start',
		// alignItems: 'center',
	},
	contentContainer: {
		width: width,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	card_small: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '95%',
		height: 200,
		// backgroundColor: 'lightgreen',
		backgroundColor: '#fff',
		borderRadius: 20,
		paddingHorizontal: 20,
		// paddingVertical: 30,
		marginVertical: 5,
		// box shadow
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 6,
	},
	text_header: {
		fontSize: 24,
	},
	text_footer: {
		fontSize: 18,
	},
});
