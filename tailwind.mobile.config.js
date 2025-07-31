{
  "theme": {
    "extend": {
      "spacing": {
        "safe": "env(safe-area-inset-bottom)"
      },
      "screens": {
        "xs": "320px"
      },
      "animation": {
        "modalIn": "modalIn 0.3s ease-out",
        "modalOut": "modalOut 0.2s ease-in"
      },
      "keyframes": {
        "modalIn": {
          "0%": {
            "opacity": "0",
            "transform": "translateY(10px)"
          },
          "100%": {
            "opacity": "1",
            "transform": "translateY(0)"
          }
        },
        "modalOut": {
          "0%": {
            "opacity": "1",
            "transform": "translateY(0)"
          },
          "100%": {
            "opacity": "0",
            "transform": "translateY(10px)"
          }
        }
      }
    }
  },
  "variants": {
    "extend": {
      "scale": ["active", "group-hover"],
      "transform": ["group-hover"],
      "opacity": ["group-hover"]
    }
  }
}
