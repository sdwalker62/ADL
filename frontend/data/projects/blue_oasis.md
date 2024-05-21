# Blue Oasis

```go
package binary

import (
	"encoding/binary"
	"errors"
	"math"
	"strconv"

	"github.com/x448/float16"
)

// ----------------------------------------- TO_BYTE_CONVERTERS (littleEndian) -----------------------------------------
// Data to bytes functions only support littleEndian because Triton's Binary Tensor Data Extension only uses little endian byte order: https://github.com/triton-inference-server/server/blob/main/docs/protocol/extension_binary_data.md

// SINGLE INSTANCE CONVERTERS
// Uint converters

// Converts a uint to a bytes slice in little endian format. A uint's value is dependent on system architecture and will be either uint32 or uint64. Thus, it will return a byte slice containing 4 or 8 bytes with respect to this.
func UintToBytes(ui uint) []byte {
	if strconv.IntSize == 32 {
		return Uint32ToBytes(uint32(ui))
	} else {
		return Uint64ToBytes(uint64(ui))
	}
}

// Converts a uint8 to bytes slice in little endian format.
func Uint8ToBytes(ui uint8) []byte {
	bs := make([]byte, 1)
	bs[0] = byte(ui)
	return bs
}

// Converts a uint16 to bytes slice in little endian format.
func Uint16ToBytes(ui uint16) []byte {
	bs := make([]byte, 2)
	binary.LittleEndian.PutUint16(bs, ui)
	return bs
}

// Converts a uint32 to bytes slice in little endian format.
func Uint32ToBytes(ui uint32) []byte {
	bs := make([]byte, 4)
	binary.LittleEndian.PutUint32(bs, ui)
	return bs
}

// Converts a uint64 to bytes slice in little endian format.
func Uint64ToBytes(ui uint64) []byte {
	bs := make([]byte, 8)
	binary.LittleEndian.PutUint64(bs, ui)
	return bs
}

// Int converters

// Converts an int to a bytes slice in little endian format. An int's value is dependent on system architecture and will be either int32 or int64. Thus, it will return a byte slice containing 4 or 8 bytes with respect to this.
func IntToBytes(i int) []byte {
	if strconv.IntSize == 32 {
		return Int32ToBytes(int32(i))
	} else {
		return Int64ToBytes(int64(i))
	}
}

// Converts an int8 to bytes slice in little endian format.
func Int8ToBytes(i int8) []byte {
	bs := make([]byte, 1)
	bs[0] = byte(i)
	return bs
}

// Converts an int16 to bytes slice in little endian format.
func Int16ToBytes(i int16) []byte {
	bs := make([]byte, 2)
	binary.LittleEndian.PutUint16(bs, uint16(i))
	return bs
}

// Converts an int32 to bytes slice in little endian format.
func Int32ToBytes(i int32) []byte {
	bs := make([]byte, 4)
	binary.LittleEndian.PutUint32(bs, uint32(i))
	return bs
}

// Converts an int64 to bytes slice in little endian format.
func Int64ToBytes(i int64) []byte {
	bs := make([]byte, 8)
	binary.LittleEndian.PutUint64(bs, uint64(i))
	return bs
}

// bool converter

// Converts a bool to bytes slice in little endian format.
func BoolToBytes(b bool) []byte {
	bs := make([]byte, 1)
	if b {
		bs[0] = byte(1)
	} else {
		bs[0] = byte(0)
	}
	return bs
}

// float converters

// Converts a float16.Float16 to bytes slice in little endian format.
func Float16ToBytes(f float16.Float16) []byte {
	bs := make([]byte, 2)
	binary.LittleEndian.PutUint16(bs, f.Bits())
	return bs
}

// Converts a float32 to bytes slice in little endian format.
func Float32ToBytes(f float32) []byte {
	bs := make([]byte, 4)
	binary.LittleEndian.PutUint32(bs, math.Float32bits(f))
	return bs
}

// Converts a float64 to bytes slice in little endian format.
func Float64ToBytes(f float64) []byte {
	bs := make([]byte, 8)
	binary.LittleEndian.PutUint64(bs, math.Float64bits(f))
	return bs
}

// string converter

// Converts a string to bytes slice in little endian format. Note that this bytes slice will consist of an initial 4 bytes that specifies the length of the string while any trailing bytes (equal to the length specified in the initial 4 bytes) are for runes within the string.
func StringToBytes(s string) []byte {
	// 4-byte before string bytes to indicate length (required to deserialize byte tensor on Triton)
	bs := append([]byte{}, Uint32ToBytes(uint32(len(s)))...)
	bs = append(bs, []byte(s)...)

	return bs
}

// SLICE CONVERTERS
// uint slice converters

// Converts a uint slice to a bytes slice in little endian format. A uint's value is dependent on system architecture and will be either uint32 or uint64. Thus, each uint will be converted to 4 or 8 bytes with respect to this.
func UintSliceToBytes(uis []uint) []byte {
	if strconv.IntSize == 32 {
		ui32s := make([]uint32, len(uis))
		for i, ui := range uis {
			ui32s[i] = uint32(ui)
		}

		return Uint32SliceToBytes(ui32s)
	} else {
		ui64s := make([]uint64, len(uis))
		for i, ui := range uis {
			ui64s[i] = uint64(ui)
		}

		return Uint64SliceToBytes(ui64s)
	}

}

// Converts a uint8 slice to a bytes slice in little endian format.
func Uint8SliceToBytes(uis []uint8) []byte {
	bs := make([]byte, len(uis)*1)
	for index, ui := range uis {
		bs[index] = byte(ui)
	}

	return bs
}

// Converts a uint16 slice to a bytes slice in little endian format.
func Uint16SliceToBytes(uis []uint16) []byte {
	byteLength := 2
	bs := make([]byte, len(uis)*byteLength)
	for uiIndex, ui := range uis {
		tmpBs := Uint16ToBytes(ui)
		for bIndex, b := range tmpBs {
			bs[bIndex+(uiIndex*byteLength)] = b
		}
	}

	return bs
}

// Converts a uint32 slice to a bytes slice in little endian format.
func Uint32SliceToBytes(uis []uint32) []byte {
	byteLength := 4
	bs := make([]byte, len(uis)*byteLength)
	for uiIndex, ui := range uis {
		tmpBs := Uint32ToBytes(ui)
		for bIndex, b := range tmpBs {
			bs[bIndex+(uiIndex*byteLength)] = b
		}
	}

	return bs
}

// Converts a uint64 slice to a bytes slice in little endian format.
func Uint64SliceToBytes(uis []uint64) []byte {
	byteLength := 8
	bs := make([]byte, len(uis)*byteLength)
	for uiIndex, ui := range uis {
		tmpBs := Uint64ToBytes(ui)
		for bIndex, b := range tmpBs {
			bs[bIndex+(uiIndex*byteLength)] = b
		}
	}

	return bs
}

// int slice converters

// Converts an int slice to a bytes slice in little endian format.
func IntSliceToBytes(is []int) []byte {
	if strconv.IntSize == 32 {
		i32s := make([]int32, len(is))
		for ind, i := range is {
			i32s[ind] = int32(i)
		}

		return Int32SliceToBytes(i32s)
	} else {
		i64s := make([]int64, len(is))
		for ind, i := range is {
			i64s[ind] = int64(i)
		}

		return Int64SliceToBytes(i64s)
	}

}

// Converts an int8 slice to a bytes slice in little endian format.
func Int8SliceToBytes(is []int8) []byte {
	bs := make([]byte, len(is)*1)
	for index, i := range is {
		bs[index] = byte(i)
	}

	return bs
}

// Converts an int16 slice to a bytes slice in little endian format.
func Int16SliceToBytes(is []int16) []byte {
	byteLength := 2
	bs := make([]byte, len(is)*byteLength)
	for iIndex, i := range is {
		tmpBs := Int16ToBytes(i)
		for bIndex, b := range tmpBs {
			bs[bIndex+(iIndex*byteLength)] = b
		}
	}

	return bs
}

// Converts an int32 slice to a bytes slice in little endian format.
func Int32SliceToBytes(is []int32) []byte {
	byteLength := 4
	bs := make([]byte, len(is)*byteLength)
	for iIndex, i := range is {
		tmpBs := Int32ToBytes(i)
		for bIndex, b := range tmpBs {
			bs[bIndex+(iIndex*byteLength)] = b
		}
	}

	return bs
}

// Converts an int64 slice to a bytes slice in little endian format.
func Int64SliceToBytes(is []int64) []byte {
	byteLength := 8
	bs := make([]byte, len(is)*byteLength)
	for iIndex, i := range is {
		tmpBs := Int64ToBytes(i)
		for bIndex, b := range tmpBs {
			bs[bIndex+(iIndex*byteLength)] = b
		}
	}

	return bs
}

// bool slice converter

// Converts a bool slice to a bytes slice in little endian format.
func BoolSliceToBytes(bools []bool) []byte {
	bs := make([]byte, len(bools))
	for i, bool := range bools {
		if bool {
			bs[i] = byte(1)
		} else {
			bs[i] = byte(0)
		}
	}

	return bs
}

// float slice converters

// Converts a float.Float16 slice to a bytes slice in little endian format.
func Float16SliceToBytes(fs []float16.Float16) []byte {
	byteLength := 2
	bs := make([]byte, len(fs)*byteLength)
	for fIndex, f := range fs {
		tmpBs := Float16ToBytes(f)
		for bIndex, b := range tmpBs {
			bs[bIndex+(fIndex*byteLength)] = b
		}
	}

	return bs
}

// Converts a float32 slice to a bytes slice in little endian format.
func Float32SliceToBytes(fs []float32) []byte {
	byteLength := 4
	bs := make([]byte, len(fs)*byteLength)
	for fIndex, f := range fs {
		tmpBs := Float32ToBytes(f)
		for bIndex, b := range tmpBs {
			bs[bIndex+(fIndex*byteLength)] = b
		}
	}

	return bs
}

// Converts a float64 slice to a bytes slice in little endian format.
func Float64SliceToBytes(fs []float64) []byte {
	byteLength := 8
	bs := make([]byte, len(fs)*byteLength)
	for fIndex, f := range fs {
		tmpBs := Float64ToBytes(f)
		for bIndex, b := range tmpBs {
			bs[bIndex+(fIndex*byteLength)] = b
		}
	}

	return bs
}

// string slice converter

// Converts a string slice to a bytes slice in little endian format. Note that each string within this bytes slice will be converted to an initial 4 bytes that specifies the length of a string while any trailing bytes (equal to the string length specified in the initial 4 bytes) are for runes within the string.
func StringSliceToBytes(strs []string) []byte {
	// not using make because strings have variable size
	bs := []byte{}
	for _, s := range strs {
		bs = append(bs, StringToBytes(s)...)
	}

	return bs
}

// ----------------------------------------- FROM_BYTE_CONVERTERS (littleEndian) -----------------------------------------

// bytes to uint converters

// Converts a bytes slice to a uint. A uint's value is dependent on system architecture and will be either uint32 or uint64. Thus, a uint will be converted from 4 or 8 bytes with respect to this.
func BytesToUint(bs []byte) (uint, error) {
	if strconv.IntSize == 32 {
		ui, err := BytesToUint32(bs)
		return uint(ui), err
	} else {
		ui, err := BytesToUint64(bs)
		return uint(ui), err
	}
}

// Converts a bytes slice to a uint8.
func BytesToUint8(bs []byte) (uint8, error) {
	if len(bs) != 1 {
		return 0, errors.New("should be 1 byte for uint8, got: " + strconv.Itoa(len(bs)))
	}

	return uint8(bs[0]), nil
}

// Converts a bytes slice to a uint16.
func BytesToUint16(bs []byte) (uint16, error) {
	if len(bs) != 2 {
		return 0, errors.New("should be 2 bytes for uint16, got: " + strconv.Itoa(len(bs)))
	}

	return binary.LittleEndian.Uint16(bs), nil
}

// Converts a bytes slice to a uint32.
func BytesToUint32(bs []byte) (uint32, error) {
	if len(bs) != 4 {
		return 0, errors.New("should be 4 bytes for uint32, got: " + strconv.Itoa(len(bs)))
	}

	return binary.LittleEndian.Uint32(bs), nil
}

// Converts a bytes slice to a uint64.
func BytesToUint64(bs []byte) (uint64, error) {
	if len(bs) != 8 {
		return 0, errors.New("should be 8 bytes for uint64, got: " + strconv.Itoa(len(bs)))
	}

	return binary.LittleEndian.Uint64(bs), nil
}

// bytes to int converters

// Converts a bytes slice to an int.
func BytesToInt(bs []byte) (int, error) {
	if strconv.IntSize == 32 {
		i, err := BytesToInt32(bs)
		return int(i), err
	} else {
		i, err := BytesToInt64(bs)
		return int(i), err
	}
}

// Converts a bytes slice to an int8.
func BytesToInt8(bs []byte) (int8, error) {
	if len(bs) != 1 {
		return 0, errors.New("should be 1 byte for int8, got: " + strconv.Itoa(len(bs)))
	}

	return int8(bs[0]), nil
}

// Converts a bytes slice to an int16.
func BytesToInt16(bs []byte) (int16, error) {
	if len(bs) != 2 {
		return 0, errors.New("should be 2 bytes for int16, got: " + strconv.Itoa(len(bs)))
	}

	return int16(binary.LittleEndian.Uint16(bs)), nil
}

// Converts a bytes slice to an int32.
func BytesToInt32(bs []byte) (int32, error) {
	if len(bs) != 4 {
		return 0, errors.New("should be 4 bytes for int32, got: " + strconv.Itoa(len(bs)))
	}

	return int32(binary.LittleEndian.Uint32(bs)), nil
}

// Converts a bytes slice to an int64.
func BytesToInt64(bs []byte) (int64, error) {
	if len(bs) != 8 {
		return 0, errors.New("should be 8 bytes for int64, got: " + strconv.Itoa(len(bs)))
	}

	return int64(binary.LittleEndian.Uint64(bs)), nil
}

// bytes to bool converter

// Converts a bytes slice to an bool.
func BytesToBool(bs []byte) (bool, error) {
	if len(bs) != 1 {
		return false, errors.New("should be 1 byte for bool, got: " + strconv.Itoa(len(bs)))
	}

	ui, _ := BytesToUint8(bs)
	return ui == 1, nil
}

// bytes to float converters

// Converts a bytes slice to a float16.Float16.
func BytesToFloat16(bs []byte) (float16.Float16, error) {
	if len(bs) != 2 {
		return 0, errors.New("should be 2 bytes for Float16, got: " + strconv.Itoa(len(bs)))
	}

	ui, _ := BytesToUint16(bs)
	return float16.Frombits(ui), nil
}

// Converts a bytes slice to a float32.
func BytesToFloat32(bs []byte) (float32, error) {
	if len(bs) != 4 {
		return 0, errors.New("should be 4 bytes for float32, got: " + strconv.Itoa(len(bs)))
	}

	return math.Float32frombits(binary.LittleEndian.Uint32(bs)), nil
}

// Converts a bytes slice to a float64.
func BytesToFloat64(bs []byte) (float64, error) {
	if len(bs) != 4 {
		return 0, errors.New("should be 8 bytes for float64, got: " + strconv.Itoa(len(bs)))
	}

	return math.Float64frombits(binary.LittleEndian.Uint64(bs)), nil
}

// bytes to string converter

// Converts a bytes slice to a string. Note that the bytes slice requires 4 initial bytes that specify the length of the string while the trailing bytes (equal to the length specified in the initial 4 bytes) are for runes within the string.
func BytesToString(bs []byte) (string, error) {
	if len(bs) < 5 {
		return "", errors.New("should be at least 5 bytes for string (4-byte length, 1+ byte string), got: " + strconv.Itoa(len(bs)))
	}

	return string(bs[4:]), nil
}

// To Slice converters
// bytes to uint slice converters

// Converts a bytes slice to a uint slice. A uint's value is dependent on system architecture and will be either uint32 or uint64. Thus, each uint will be converted from 4 or 8 bytes with respect to this.
func BytesToUintSlice(bs []byte) ([]uint, error) {
	if strconv.IntSize == 32 {
		ui32s, err := BytesToUint32Slice(bs)
		uis := make([]uint, len(ui32s))
		for i, ui32 := range ui32s {
			uis[i] = uint(ui32)
		}
		return uis, err
	} else {
		ui64s, err := BytesToUint64Slice(bs)
		uis := make([]uint, len(ui64s))
		for i, ui64 := range ui64s {
			uis[i] = uint(ui64)
		}
		return uis, err
	}
}

// Converts a bytes slice to a uint8 slice.
func BytesToUint8Slice(bs []byte) ([]uint8, error) {
	byteSize := 1
	iters := 0

	if len(bs) == 0 {
		return []uint8{}, errors.New("input byte slice is not divisible by 1 (length is " + strconv.Itoa(len(bs)) + ") and each uint8 should be 1 byte")
	}

	uis := make([]uint8, len(bs))

	for iters < len(bs) {
		ui, _ := BytesToUint8(bs[iters:(iters + byteSize)])
		uis[iters] = ui
		iters++
	}

	return uis, nil
}

// Converts a bytes slice to a uint16 slice.
func BytesToUint16Slice(bs []byte) ([]uint16, error) {
	byteSize := 2
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []uint16{}, errors.New("input byte slice is not divisible by 2 (length is " + strconv.Itoa(len(bs)) + ") and each uint16 should be 2 bytes")
	}

	uis := make([]uint16, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		ui, _ := BytesToUint16(bs[startIndex:(startIndex + byteSize)])
		uis[iters] = ui
		iters++
	}

	return uis, nil
}

// Converts a bytes slice to a uint32 slice.
func BytesToUint32Slice(bs []byte) ([]uint32, error) {
	byteSize := 4
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []uint32{}, errors.New("input byte slice is not divisible by 4 (length is " + strconv.Itoa(len(bs)) + ") and each uint32 should be 4 bytes")
	}

	uis := make([]uint32, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		ui, _ := BytesToUint32(bs[startIndex:(startIndex + byteSize)])
		uis[iters] = ui
		iters++
	}

	return uis, nil
}

// Converts a bytes slice to a uint64 slice.
func BytesToUint64Slice(bs []byte) ([]uint64, error) {
	byteSize := 8
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []uint64{}, errors.New("input byte slice is not divisible by 8 (length is " + strconv.Itoa(len(bs)) + ") and each uint64 should be 8 bytes")
	}

	uis := make([]uint64, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		ui, _ := BytesToUint64(bs[startIndex:(startIndex + byteSize)])
		uis[iters] = ui
		iters++
	}

	return uis, nil
}

// bytes to int slice converters

// Converts a bytes slice to an int slice. An int's value is dependent on system architecture and will be either int32 or int64. Thus, each int will be converted from 4 or 8 bytes with respect to this.
func BytesToIntSlice(bs []byte) ([]int, error) {
	if strconv.IntSize == 32 {
		i32s, err := BytesToInt32Slice(bs)
		is := make([]int, len(i32s))
		for index, i32 := range i32s {
			is[index] = int(i32)
		}
		return is, err
	} else {
		i64s, err := BytesToInt64Slice(bs)
		is := make([]int, len(i64s))
		for index, i64 := range i64s {
			is[index] = int(i64)
		}
		return is, err
	}
}

// Converts a bytes slice to an int8 slice.
func BytesToInt8Slice(bs []byte) ([]int8, error) {
	byteSize := 1
	iters := 0

	if len(bs) == 0 {
		return []int8{}, errors.New("input byte slice is not divisible by 1 (length is " + strconv.Itoa(len(bs)) + ") and each int8 should be 1 byte")
	}

	is := make([]int8, len(bs))

	for iters < len(bs) {
		i, _ := BytesToInt8(bs[iters:(iters + byteSize)])
		is[iters] = i
		iters++
	}

	return is, nil
}

// Converts a bytes slice to an int16 slice.
func BytesToInt16Slice(bs []byte) ([]int16, error) {
	byteSize := 2
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []int16{}, errors.New("input byte slice is not divisible by 2 (length is " + strconv.Itoa(len(bs)) + ") and each int16 should be 2 bytes")
	}

	is := make([]int16, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		i, _ := BytesToInt16(bs[startIndex:(startIndex + byteSize)])
		is[iters] = i
		iters++
	}

	return is, nil
}

// Converts a bytes slice to an int32 slice.
func BytesToInt32Slice(bs []byte) ([]int32, error) {
	byteSize := 4
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []int32{}, errors.New("input byte slice is not divisible by 4 (length is " + strconv.Itoa(len(bs)) + ") and each int32 should be 4 bytes")
	}

	is := make([]int32, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		i, _ := BytesToInt32(bs[startIndex:(startIndex + byteSize)])
		is[iters] = i
		iters++
	}

	return is, nil
}

// Converts a bytes slice to an int64 slice.
func BytesToInt64Slice(bs []byte) ([]int64, error) {
	byteSize := 8
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []int64{}, errors.New("input byte slice is not divisible by 8 (length is " + strconv.Itoa(len(bs)) + ") and each int64 should be 8 bytes")
	}

	is := make([]int64, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		i, _ := BytesToInt64(bs[startIndex:(startIndex + byteSize)])
		is[iters] = i
		iters++
	}

	return is, nil
}

// bytes to bool slice converter

// Converts a bytes slice to a bool slice.
func BytesToBoolSlice(bs []byte) ([]bool, error) {
	byteSize := 1
	iters := 0

	if len(bs) == 0 {
		return []bool{}, errors.New("input byte slice is not divisible by 1 (length is " + strconv.Itoa(len(bs)) + ") and each bool should be 1 byte")
	}

	bools := make([]bool, len(bs))

	for iters < len(bs) {
		bool, _ := BytesToBool(bs[iters:(iters + byteSize)])
		bools[iters] = bool
		iters++
	}

	return bools, nil
}

// bytes to float slice converters

// Converts a bytes slice to a float16.Float16 slice.
func BytesToFloat16Slice(bs []byte) ([]float16.Float16, error) {
	byteSize := 2
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []float16.Float16{}, errors.New("input byte slice is not divisible by 2 (length is " + strconv.Itoa(len(bs)) + ") and each Float16 should be 2 bytes")
	}

	fs := make([]float16.Float16, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		f, _ := BytesToFloat16(bs[startIndex:(startIndex + byteSize)])
		fs[iters] = f
		iters++
	}

	return fs, nil
}

// Converts a bytes slice to a float32 slice.
func BytesToFloat32Slice(bs []byte) ([]float32, error) {
	byteSize := 4
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []float32{}, errors.New("input byte slice is not divisible by 4 (length is " + strconv.Itoa(len(bs)) + ") and each float32 should be 4 bytes")
	}

	fs := make([]float32, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		f, _ := BytesToFloat32(bs[startIndex:(startIndex + byteSize)])
		fs[iters] = f
		iters++
	}

	return fs, nil
}

// Converts a bytes slice to a float64 slice.
func BytesToFloat64Slice(bs []byte) ([]float64, error) {
	byteSize := 8
	iters := 0

	if len(bs) == 0 || len(bs)%byteSize != 0 {
		return []float64{}, errors.New("input byte slice is not divisible by 8 (length is " + strconv.Itoa(len(bs)) + ") and each float64 should be 8 bytes")
	}

	fs := make([]float64, len(bs)/byteSize)

	for (iters * byteSize) < len(bs) {
		startIndex := iters * byteSize
		f, _ := BytesToFloat64(bs[startIndex:(startIndex + byteSize)])
		fs[iters] = f
		iters++
	}

	return fs, nil
}

// bytes to string slice converter

// Converts a bytes slice to a string slice. Note that each string in the bytes slice requires 4 initial bytes that specify the length of the string while the trailing bytes (equal to the length specified in the initial 4 bytes) are for runes within a string.
func BytesToStringSlice(bs []byte) ([]string, error) {
	currIndex := 0
	strs := []string{}

	for currIndex < len(bs) {
		// Check for preceding 4 bytes for string length
		if currIndex+4 <= len(bs) {
			// first 4 bytes are length of string
			strLength, _ := BytesToUint32(bs[currIndex:(currIndex + 4)])
			// Check for the presence of bytes of string == the string length specified by preceding 4 bytes
			if currIndex+4+int(strLength) <= len(bs) {
				str, _ := BytesToString(bs[currIndex:(currIndex + 4 + int(strLength))])
				strs = append(strs, str)
				currIndex += 4 + int(strLength)
			} else {
				return strs, errors.New("the end of the byte slice has some extra bytes that are not enough for a string (4 bytes for string length, >=1 bytes for actual string)")
			}
		} else {
			return strs, errors.New("the end of the byte slice has some extra bytes that are not enough for a string (4 bytes for string length, >=1 bytes for actual string)")
		}
	}

	return strs, nil
}
```