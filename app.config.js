module.exports = () => ({
  "icon": "./assets/images/icon.png",
  "expo": {
    "name": "Math Facts for K-4",
    "slug": "math-facts",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "mathfacts",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splashscreen.png",
      "resizeMode": "contain",
      "backgroundColor": "#855797"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.anonymous.math-facts",
      "runtimeVersion": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "runtimeVersion": {
        "policy": "appVersion"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#232323",
          "image": "./assets/images/splashscreen.png",
          "dark": {
            "image": "./assets/images/splashscreen.png",
            "backgroundColor": "#232323"
          },
          "imageWidth": 200
        }
      ],
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "23c5c2e2-6e00-4982-91da-a24bb3bbe888"
      }
    },
    "updates": {
      "url": "https://u.expo.dev/23c5c2e2-6e00-4982-91da-a24bb3bbe888"
    }
  }
})
