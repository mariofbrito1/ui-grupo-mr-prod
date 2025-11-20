{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Start React Dev",
            "type": "shell",
            "command": "powershell",
            "args": [
                "-Command",
                "$env:OPENSSL_CONF = $null; npm run start"
            ],
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "isBackground": true,
            "problemMatcher": [
                {
                    "pattern": [
                        {
                            "regexp": ".",
                            "file": 1,
                            "location": 2,
                            "message": 3
                        }
                    ],
                    "background": {
                        "activeOnStart": true,
                        "beginsPattern": ".*(Local:|compiled successfully).*",
                        "endsPattern": ".*"
                    }
                }
            ],
            "group": "build"
        }
    ]
}