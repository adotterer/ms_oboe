emoji_dict = {
    "Rain": "🌧",
    "Clouds": "☁️",
    "Clear": "☀️",
}

# this is necessary to make the emojiis one character long
# for rjust, ljust
for key in emoji_dict:
    emoji_dict[key] = emoji_dict[key][0:1]
