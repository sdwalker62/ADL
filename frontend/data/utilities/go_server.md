# Tensor Package Design Overview

A tensor is a multi-dimensional array that can store any datatype. A tensor internally is a flat slice that is abstracted into multiple dimensions (a shape) based on a slice of integers. The abstracted dimensions will be accessible using indices in combination with the stride lengths of each dimension (strides).

```go
// A Tensor can have n-dimensions as long as the combination of those dimensions is equal to the number of data elements.
// For example, a Tensor with 8 data elements can have shape of [2, 2, 2], [4, 2], [2, 4], [8], or even something
// strange like [1, 1, 1, 1, ..., 4, 2].
//
// A Tensor with data [1, 2, 3, 4, 5, 6, 7, 8] and shape [2, 2, 2] will have the following abstracted view:
//
//	[[[1 2] [3 4]]
//	 [[5 6] [7 8]]]
//
// The above Tensor will also have a strides field, which as stated below, is based on the shape of data. A stride
// is the size of an "element" within the data field for a specific dimension. For instance, in the above example tensor,
// the strides array would be [4, 2, 1] because the first dimension contains 2 "elements" ([1, 2, 3, 4] and [5, 6, 7, 8]) that
// actually contain 4 elements from the data field. Then for the second dimension there are 4 "elements" (([1, 2], [3, 4],
// [5, 6], and [7, 8])) that actually contain 2 elements from the data field. Finally, the third dimension is single elements.
//
// The easiest way to calculate the strides is as follows. Start with the length of the data field and then divide it by the first dimension to get the first
// stride (8 / 2 = 4). Then for each additional dimension, divide the previous quotient by that dimension to get the next stride.
// 4 / 2 = 2 and 2 / 2 = 1


type Tensor[T any] struct {
    data []T
    shape []int64
    strides []int64 // strides are based on shape of data
}
```

## Create Tensor

```go
/*
Creates a new Tensor given a slice of some data type and a shape. The combination of the shape dimensions must be == to the number of data elements. The strides field will be set based on the shape.

Possible errors:
- empty data
- empty shape
- combination of shape != len(data)
*/
func NewTensor(data []T, shape []int64) (*Tensor[T], error)
```

## Get/Set fields

```go
/*
Get the underlying data slice of the Tensor.
*/
func (t *Tensor[T]) GetData() []T
```

```go
/*
Get the underlying shape of the Tensor.
*/
func (t *Tensor[T]) GetShape() []int64
```

```go
/*
Get the underlying strides of the Tensor.
*/
func (t *Tensor[T]) GetStrides() []int64
```

```go
/*
Set the underlying data slice of the Tensor. The data must be == to the combination of the shape dimensions.

Possible errors:
- data empty
- combination of shape != len(data)
*/
func (t *Tensor[T]) SetData(data []T) error
```

```go
/*
Set the underlying shape of the Tensor. The combination of the shape dimensions must be == to the number of data elements. The strides field will be updated based on the shape.

Possible errors:
- shape empty
- combination of shape != len(data)
*/
func (t *Tensor[T]) SetShape(shape []int64) error
```

## Utility

```go
/*
Make a copy of the current tensor
*/
func (t *Tensor[T]) Copy() Tensor
```

```go
/*
Copy the current tensor's fields into another tensor
*/
func (t *Tensor[T]) CopyTo(t_copy *Tensor[T])
```

Because the default printing of a struct is not representative of the multi-dimensional structure of a Tensor (as in it only prints the struct's fields with their contents), we should have some function that produces a formatted Tensor string based on its data and shape. This string can then be used for whatever print package that someone wants to use such as `fmt` or `log`.

```go
/*
Produce a string of a formatted Tensor.

A Tensor with data [1, 2, 3, 4, 5, 6, 7, 8] and shape [2, 2, 2] will have the following string:

   [[[1 2] [3 4]]
    [[5 6] [7 8]]]

While the same Tensor with shape [4, 2] will have the following string:

    [[1 2]
     [3 4]
     [5 6]
     [7 8]]

Shape [8]:

[1, 2, 3, 4, 5, 6, 7, 8]

Shape [2, 4]:

   [[[1 2 3 4]]
    [[5 6 7 8]]]

Shape [2, 1, 1, 1, 4]:

   [[[[[[1 2 3 4]]]]]
    [[[[[5 6 7 8]]]]]]

*/
func (t *Tensor[T]) GetPrintString() string
```

## Get/Set Elements

Accessing elements of a tensor with strides and indices should be accomplished by multiplying each stride by its respective index parameter. So for example, the GetElement function below would behave as follows internally:

```go
tensor, _ := NewTensor([]int{1, 2, 3, 4, 5, 6, 7, 8}, []int{2, 2, 2})
// The above creates a new tensor that will have the following values in each field.
// data: [1, 2, 3, 4, 5, 6, 7, 8]
// shape: [2, 2, 2]
// strides: [4, 2, 1]

// And it will be represented like so
// [[[1 2] [3 4]]
//  [[5 6] [7 8]]]
//
// Let's try to get the element 6
tensor.GetElement(1, 0, 1)
// GetElement creates an index for the underlying flattened data array using these indices and the underlying strides array.
// As you can see, the index of 6 in the data field is 5. To find this index we multiply each index with its respective dimension's stride length.
// Thus we have (4 * 1) + (2 * 0) + (1 * 1) = 5, and GetElement receives the element 6.

// SetElement should behave likewise but for setting and element.
// Get/SetElementsAsX should behave somewhat similarly as well; however, these functions should find the starting and ending indices of the sequential elements in the data field that must be retrieved or set.
tensor.GetElementsAsSlice(0, 1)
// For instance, the above function will retrieve [3 4], thus it needs to find the starting and ending indices for getting this subslice to access the data field as such data[2:4]
```

```go
/*
Get the element at the specified indices as long as they are within the shape of the Tensor.

Possible errors:
- indices is empty
- len(indices) != len(shape) // In order to get a single element we must have an exact index for every dimension
- indices out or range of shape
*/
func (t *Tensor[T]) GetElement(indices ...int64) (T, error)
```

```go
/*
Set the element at the specified indices as long as they are within the shape of the Tensor.

Possible errors:
- indices is empty
- len(indices) != len(shape) // In order to set a single element we must have an exact index for every dimension
- indices out or range of shape
*/
func (t *Tensor[T]) SetElement(indices ...int64) (T, error)
```

```go
/*
Get the elements as a slice at the specified indices as long as they are within the shape of the Tensor. This will be returned as a slice (empty if there is an error).

Possible errors:
- indices is empty
- indices out or range of shape
*/
func (t *Tensor[T]) GetElementsAsSlice(indices ...int64) ([]T, error)
```

```go
/*
Get a new Tensor from the indices you want to extract from the original Tensor, as long as the indices are within the shape of the Tensor. This will be returned as a Tensor (empty if there is an error).

Example:

tensor, _ := NewTensor([]int{1, 2, 3, 4, 5, 6, 7, 8}, []int{2, 2, 2})
tensor1, _ := GetElementsAsTensor(1)) // tensor1 = Tensor{[5, 6, 7, 8], [2,2]}
tensor2, _ := GetElementsAsTensor(0, 1)) // tensor2 = Tensor{[3, 4], [2]}
tensor3, _ := GetElementsAsTensor(0, 0, 1)) // tensor3 = Tensor{[2], [1]}

Possible errors:
- indices is empty
- indices out or range of shape
*/
func (t *Tensor[T]) GetElementsAsTensor(indices ...int64) (*Tensor[T], error)
```

```go
/*
Set the elements of a Tensor from a slice at the specified indices as long as they are within the shape of the Tensor. This will be returned as a slice (empty if there is an error).

Possible errors:
- indices is empty
- indices out or range of shape
*/
func (t *Tensor[T]) SetElementsFromSlice(indices ...int64, newElementsSlice []T) error
```

```go
/*
Set elements of a Tensor at the indices of the original Tensor, as long as the indices are within the shape of the Tensor. This will be returned as a Tensor (empty if there is an error).

Possible errors:
- indices is empty
- indices out or range of shape
*/
func (t *Tensor[T]) SetElementsFromTensor(indices ...int64, newElementsTensor Tensor[T]) error
```

We need to discuss the best way for extracting columnar data from a tensor. We could create new functions for getting column data, or we could alter the current get/set element functions to be able to handle this function. However, I am unsure of how to create a function that has intuitive parameters for defining a column to extract based on our current Tensor design. I thought of a few ideas:

1. My initial thoughts on this is for the arguments to be `indices` with a -1 in a single dimension to indicate that that dimension needs to be looped over to extract a column, but this is confusing in my opinion. An example of this would be the following:

```go
tensor, _ := NewTensor([]int{1, 2, 3, 4, 5, 6, 7, 8}, []int{2, 2, 2})
/*
[[[1 2] [3 4]]
 [[5 6] [7 8]]]
*/
slice1 := tensor.GetElementsAsSlice(1, -1, 1) // slice1 = [6, 8]
slice2 := tensor.GetElementsAsSlice(-1, 0) // slice2 = [1, 2, 5, 6]
slice3 := tensor.GetElementsAsSlice(-1, 1, 0) // slice2 = [3, 7]
```

2. An alternative design to the past version is to have two parameters. One for specifying the column index to extract within that dimension and another for specifying the dimensions prior to the dimension of the column index. The -1 may still be necessary to use here in cases where a dimension needs to be looped through that comes in a earlier dimension in the shape field than the dimension of the column index (see slice3 in the code below as an example of what I mean). This approach is a bit more sensible but still suffers from having -1 in the parameters on occasion.

```go
func (t *Tensor[T]) GetColumnElementsAsSlice(columnIndex int64, indices ...int64) []T {
    // code that works
}

tensor, _ := NewTensor([]int{1, 2, 3, 4, 5, 6, 7, 8}, []int{2, 2, 2})
/*
[[[1 2] [3 4]]
 [[5 6] [7 8]]]
*/
slice1 := tensor.GetColumnElementsAsSlice(1, 1) // slice1 = [6, 8]
slice2 := tensor.GetColumnElementsAsSlice(0) // slice2 = [1, 2, 5, 6]
slice3 := tensor.GetColumnElementsAsSlice(0, -1, 1) // slice2 = [3, 7]
```

3. If we implement the Transpose function that is defined in the [Basic Math](#basic-math) section. We could require that it be used in conjuction with the GetElementsAsX functions if one wants to retrieve columnar data since the transpose will make the columns accessible as rows.

## Cast Datatypes

After a tensor is created, its data type is immutable. We will need functions for casting tensors into tensors of another datatype. Practically, I think these functions should take the original tensor's data slice and convert its contents to a new data type, then the new data slice should be input into the NewTensor function along with the original tensor's shape to create a new tensor. The new tensor will replace the old tensor.

```go
/*
Casts current Tensor data to a new valid data type based on the datatype's string. CastTo should support all basic datatypes for Triton.

Datatypes are: bool, uint8, uint16, uint32, uint64, int8, int16, int32, int64, fp16, fp32, fp64, string (bytes)

Possible errors:
- no string
- string is not a datatype
- string is for a type that is not a valid type to cast to (i.e. bool to Tensor)
*/
func (t *Tensor[T]) CastTo(castToType string) error
```

## Basic Math

We may need adding, subtracting, multiplying, and dividing functions for columnar data.

```go
/*
Add value to element or elements at given indices, as long as the indices are within the shape of the Tensor.

Possible errors:
- indices is empty
- indices out or range of shape
- Tensor has datatype that cannot be added (bool, string)
*/
func (t *Tensor[T]) Add(value T, indices ...int64) error
```

```go
/*
Add value to every element in Tensor.

Possible errors:
- Tensor has datatype that cannot be added (bool, string)
*/
func (t *Tensor[T]) AddAll(value T) error
```

```go
/*
Subtract value from element or elements at given indices, as long as the indices are within the shape of the Tensor.

Possible errors:
- indices is empty
- indices out or range of shape
- Tensor has datatype that cannot be subtracted (bool, string)
- unsigned int subtraction goes negative (perhaps just set elements to 0 in this case?)
*/
func (t *Tensor[T]) Subtract(value T, indices ...int64) error
```

```go
/*
Subtract value from every element in Tensor.

Possible errors:
- Tensor has datatype that cannot be subtracted (bool, string)
- unsigned int subtraction goes negative (perhaps just set elements to 0 in this case?)
*/
func (t *Tensor[T]) SubtractAll(value T) error
```

```go
/*
Multiply value with element or elements at given indices, as long as the indices are within the shape of the Tensor.

Possible errors:
- indices is empty
- indices out or range of shape
- Tensor has datatype that cannot be multiplied(bool, string)
- unsigned int multiply by negative
*/
func (t *Tensor[T]) Multiply(value T, indices ...int64) error
```

```go
/*
Multiply value with every element in Tensor.

Possible errors:
- Tensor has datatype that cannot be multiplied (bool, string)
- unsigned int multiply by negative
*/
func (t *Tensor[T]) MultiplyAll(value T) error
```

```go
/*
Divide element or elements by value at given indices, as long as the indices are within the shape of the Tensor.

Possible errors:
- indices is empty
- indices out or range of shape
- Tensor has datatype that cannot be divided (bool, string)
- division by zero
- unsigned int divide by negative
*/
func (t *Tensor[T]) Divide(value T, indices ...int64) error
```

```go
/*
Divide every element by value in Tensor.

Possible errors:
- Tensor has datatype that cannot be divided (bool, string)
- unsigned int divide by negative
- division by zero
*/
func (t *Tensor[T]) DivideAll(value T) error
```

```go
/*
Modulo element or elements by value at given indices, as long as the indices are within the shape of the Tensor.

Possible errors:
- indices is empty
- indices out or range of shape
- Tensor has datatype that cannot use mod operator (bool, string)
*/
func (t *Tensor[T]) Modulo(value T, indices ...int64) error
```

```go
/*
Modulo every element by value in Tensor.

Possible errors:
- Tensor has datatype that cannot use mod operator (bool, string)
*/
func (t *Tensor[T]) ModuloAll(value T) error
```

```go
/*
Transpose the tensor.

A Tensor with data [1, 2, 3, 4, 5, 6, 7, 8] and shape [2, 2, 2] will look as follows:

   [[[1 2] [3 4]]
    [[5 6] [7 8]]]

And after transposing it would look like:

   [[[1 5] [3 7]]
    [[2 6] [4 8]]]

In order for this function to work, we must edit the underlying data and shape fields (the strides field will be updated in relation to the shape) of Tensor.

The shape field will always be reversed so a [3, 6, 5] shape will become [5, 6, 3] or vice versa. Ensure to update the stride accordingly.

Internally this function can use the NewTensor() function, so we can build a new data slice that is filled be appending the data from each column within the original Tensor's data field.
*/
func (t *Tensor[T]) Transpose(value T) *Tensor[T]
```

## Possible Other/Later Functions

- Max - get max in tensor
- Min - get min in tensor
- ArgMax - get args of max in tensor
- ArgMaxTensor - get args of all max instances in tensor
- ArgMin - get args of min in tensor
- ArgMinTensor - get args of all min instances in tensor
- Any - test if any elements in tensor evaluate to true
- All - test if all elements in tensor evalutate to true
- OR - get OR results of two tensors
- AND - get AND results of two tensors
- NOT - get NOT results of tensor
- XOR - get XOR results of two tensors
- UniqueCount - count unique elements in tensor
- IndexOf - get index of first instance of an element in tensor
- IndexOfTensor - get indices of all instances of searched element in tensor
- BoolMask - Use some expression to create a bool tensor mask of the current tensor
