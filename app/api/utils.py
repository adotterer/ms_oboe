def prettifyComposer(composer_name):
    composer_strings = composer_name.split()
    try:
        if len(composer_strings) > 1:
            return composer_strings[1]
        else:
            return composer_name
    except Exception as e:
        return e
