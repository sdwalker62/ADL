// https://studiostyl.es/schemes/create

#pragma once
#include "Header.h" // Contains ISomeClass and includes <vector>, <list>
#define PREPROCESSOR_DEFINITION

namespace MyNamespace
{
void GlobalFunction() {}
bool GlobalVariable = true;
/// <summary>
/// The quick brown fox jumps over the lazy dog
/// THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
/// </summary>
class SomeClass    : public ISomeClass
{
public:
    enum SomeEnum
    {
        ENUM_0 = 0,
        ENUM_1 = 1
    };
    struct SomeData
    {
        int m_Integer;
        float m_Float;
    };

    SomeClass() { m_Data = new SomeData(); }
    ~SomeClass() { delete m_Data; m_Data = 0; }

    static int DoSomethingStatic( int _Arg0, float _Arg1 )
    {
        std::vector<float> Vec = std::vector<float>();
        
        float f = 0.0f;
        for (int i = 0; i < _Arg0; ++i)
        {
            if (i % 3 != 0)
            {
                f += _Arg1;
                Vec.push_back(f);
            }
        }
        return Vec.size();
    }

    template<class _T>
    int DoSomethingNonStatic() const;
private:
    SomeData* m_Data;
    static SomeData* m_StaticData;
};

}    // MyNamespace