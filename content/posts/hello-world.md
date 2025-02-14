---
title: 'Hello World'
date: 2024-01-01T21:27:56+05:30
---


## Number System 
What do Roman numerals, Tally marks, Decimal and Binary number systems have in common? They are all used to describe __Quantity__ or the __number of things__, each with its unique style motivated by a particular usecase.
Tally Marks exist from the primitive ages and were probably made to keep track of the stock of apples left and Roman numerals were invented to write relatively large quantities probably to ledger cash, it would not be really fun writing hundred or even a thousand in tally marks.



Decimal system is the one with which you grew up with, atleast I did, which came to be after humanity invented ```0``` which comes really handy while simplifying fractions, it is also called the Base 10 system because we have 10 Basic __states__ or __configurations__ or __symbols__ to work with, namely ```0,1,2,3,4,5,6,7,8,9```. 
The decimal number system has two main attributes indices(place), base.

> In the Decimal system, a number is represented by a list of digits from 0 to 9, where each digit represents the coefficient for a power of 10 determined by it's place. 

> Mathematically, if N is any number, its decimal equivalent $$x_b x_{b-1} \cdots x_1 x_0 . x_{-1} \cdots x_{a+1} x_{a}$$ has the relation,
> $$N = \sum_{i=a}^b{x_i 10^i}$$ 
> where $x_i = {0,1,\dots 9}$

look at the following examples,
$$114.5 = 1\cdot10^2 + 1\cdot10^1 + 4\cdot 10^0 + 5\cdot10^{-1}$$
$$11.64 = 1\cdot10^1 + 1\cdot 10^0 + 6\cdot10^{-1} + 4\cdot10^{-2}$$

Now, the binary (meaning "two") number system is defined similarly but with a base of 2,
> In the Binary system, a number is represented by 0 or 1, where each digit represents the coefficient for a power of 2 for it's place.

>Mathematically, if N is a any number, its binary equivalent $$x_b x_{b-1} \cdots x_1 x_0 . x_{-1} \cdots x_{a+1} x_{a}$$ has the relation,
> $$ N = \sum_{i=a}^b{x_i 2^i}  $$ 
> where $x_i = {0,1}$

$$ (1001)_2 = 1\cdot2^3 + 0\cdot 2^2 + 0\cdot2^1 + 1\cdot2^0 = 9 $$
$$ (1001.01)_2 = 1\cdot2^3 + 0\cdot 2^2 + 0\cdot2^1 + 1\cdot2^0 + 0\cdot2^{-1} + 1\cdot2^{-2} = 9.25 $$
 
The Binary number system readily finds its way in the most useful Binary device (No pun intended) humans ever created, _**the transistor**_ . A transistor can either be **ON** (__if it outputs current__) or **OFF** otherwise. Computers are built on these small devices and therfore to work with such a binary system, the binary number system seemed as the perfect choice until.... we came short on the abilities of our memory devices.

A bit alone can attain only two states (ON or OFF) and therefore it can only represent two possible values based on its state, conventionally ```0``` and ```1```, but a list of $n$ bits can collectively exist in $2^n$ unique combinations or states. This allows us to store $2^n$ different numbers in memory, each mapped directly from a unique combination of the list of stored bits.

* Information is stored in computer memory as lists of bits of fixed length (8-bit, 64-bit), each list is known as a **register**, fundamentally storing values in variables comes down to filling these **registers**. 


* It is helpful to view number systems as a one-one linear mapping from the set of all possible states to the Real Number line. The idea being that if you have such a mapping at your disposal you can figure out the only unique real number corresponding to a given array of bits, which is what a computer needs to do in order to store numbers.

## Fixed-point numbers
In a fixed-point representation, we fix our imaginary decimal point somewhere in middle of our list of bits and store numbers accordingly.

Let's first look at the idea in base 10, given that we allocate last 3 places for the difits after the decimal, we store the decimal number $14.78$ as $14.78 \times 10^3 = 14780$ and similarly 


 Decimal | Fixed point representation 
-------- | -------------------------- 
 503.445 | 503445 
 2.34 | 2340 
2300.3 | 2300300
23.3305 | 23330

any place after the 3rd place after the decimal is dropped.

For example, consider a 8-bit register where the last 3 bits are allotted to the value after the decimal point.
$ {(18.625 \times 2^{3} )}\_{10}  = (149)\_{10}= (10010101)\_2 $

Here the number $18.625$ is stored in memory as

<img src="../img/drawing.png" alt="drawing" width="400"/>

| Binary    | Internal Fixed point representation |
|:---------:| :----------------------------------- |
| 101.110   | 101110                              |
| 101.11    | 101110                              |
| 101.10    | 101100                              |
| 101.1101  | 101110                              |


Although it is easier to perform arithemetic with fixed point numbers, there are numerous occassions when you would want to deal with numbers of very small magnitude in the order of $10^{-12}$ and to be able to multiply and divide them by numbers of relatively large magnitude in the order of $10^{12}$ ; Now, If you wish to use fixed-point representation you would require roughly 80+ bits which might not seem alot in the modern age but 30 years ago they were very expensive, this forced computer scientists to look for better ways of storing decimal numbers.
