"use strict";
exports.__esModule = true;
var expo_status_bar_1 = require("expo-status-bar");
var react_native_1 = require("react-native");
function App() {
    return (React.createElement(react_native_1.View, { style: styles.container },
        React.createElement(react_native_1.Text, null, "Open up App.tsx to start working on your app!"),
        React.createElement(expo_status_bar_1.StatusBar, { style: "auto" })));
}
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
