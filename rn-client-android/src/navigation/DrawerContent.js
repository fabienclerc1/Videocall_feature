import {
	Avatar,
	Caption,
	Drawer,
	Paragraph,
	Switch,
	Text,
	Title,
	TouchableRipple,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';

import { AuthContext } from '../Context/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useContext } from 'react';
import { SocketContext } from '../components/SocketContext';

const DrawerContent = (props) => {
	const [isDarkTheme, setIsDarkTheme] = React.useState(false);

	const { signOut } = React.useContext(AuthContext);
	const {username} = useContext(SocketContext)

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props}>
				<View style={styles.drawerContent}>
					{/* <Text>Main Content</Text> */}
					<View style={styles.userInfoSection}>
						<View style={{ flexDirection: 'row', marginTop: 15 }}>
							<Avatar.Image
								source={{
									uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
								}}
								size={60}
							/>
							<View
								style={{
									marginLeft: 15,
									flexDirection: 'column',
								}}
							>
								<Title style={styles.title}>
									{username}
								</Title>
								<Caption style={styles.caption}>
									ID: OSD2250
								</Caption>
							</View>
						</View>
					</View>
				</View>
				<Drawer.Section style={styles.drawerSection}>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon
								name="home-outline"
								color={color}
								size={size}
							/>
						)}
						label="Home"
						onPress={() => {
							props.navigation.navigate('Home');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon
								name="account-outline"
								color={color}
								size={size}
							/>
						)}
						label="Profile"
						onPress={() => {
							props.navigation.navigate('Profile');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon
								name="clipboard-text-outline"
								color={color}
								size={size}
							/>
						)}
						label="Reports"
						onPress={() => {
							props.navigation.navigate('ReportsScreen');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon
								name="account-check-outline"
								color={color}
								size={size}
							/>
						)}
						label="Check Up"
						onPress={() => {
							props.navigation.navigate('CheckUpScreen');
						}}
					/>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon
								name="account-cog-outline"
								color={color}
								size={size}
							/>
						)}
						label="Settings"
						onPress={() => {
							props.navigation.navigate('SettingsScreen');
						}}
					/>
				</Drawer.Section>
				<Drawer.Section title="Preferences">
					<TouchableRipple
						onPress={() => {
							toggleTheme();
						}}
					>
						<View style={styles.preference}>
							<Text>Dark Theme</Text>
							<View pointerEvents="none">
								<Switch value={isDarkTheme} />
							</View>
						</View>
					</TouchableRipple>
				</Drawer.Section>
			</DrawerContentScrollView>
			<Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ color, size }) => (
						<Icon name="exit-to-app" color={color} size={size} />
					)}
					label="Sign Out"
					onPress={() => {
						signOut();
					}}
				/>
			</Drawer.Section>
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
