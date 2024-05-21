# Python Test

```py
__GLOBAL__ = 0

class ColorThemeTest:
    def __init__(self, arg1, arg2):
        self.a1 = arg1
        self.a2 = arg2

    @staticmethod
    def print_to_console(string: str):
        print(f'Input string: {string}')

    def get_num_args():
        return 2

    @classmethod
    def print_num_args(self):
        return self.get_num_args();

    # This is a comment
    def regex_test():
        return '\n'

    """
    This is abusing multiline text as a comment
    """
    def bad_char_test():
        return ????

    def operator_test():
        return 1+1

    @staticmethod
    def doc_comment_test(arg1, arg2):
        """reStructuredText Documentation Test

        :param arg1: first argument
        :param arg2: second argument
        :type arg1: string
        :returns: nothing
        :rtype: null
        """
        print('test complete')

    @staticmethod
    def array_test():
        arr = [];
        for i in range(10):
            arr[i] = i
        return arr

    @staticmethod
    def set_test():
        my_set = {1, 2}
        my_set.push(1)
        return my_set


```
