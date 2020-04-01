from backend.serializers import UserSerializer


def jwt_response_handler(token, user=None, request=None):
    """ Adds a 'user' field to the user's serialized data when a token is generated. """
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data,
    }
