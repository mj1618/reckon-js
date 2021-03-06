module.exports = {
    "rules": {
        "indent": [
            2,
            4,
            {"SwitchCase": 1}
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "always"
        ]
    },
    "ecmaFeatures": {
        "modules": true
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended"
};