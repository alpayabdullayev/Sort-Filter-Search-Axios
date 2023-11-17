import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";

const Section = () => {
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);
    const [category, setCategory] = useState("ALL")

    const fetchData = async () => {
        try {
            const response = await axios("https://northwind.vercel.app/api/products");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClick = () => {
        const sortedData = [...data].sort((a, b) => (b.name > a.name ? 1 : a.name > b.name ? -1 : 0));
        setData(sortedData);
        // console.log(sortedData);
    };

    const handleClickA = () =>{
        const sortedDataA = [...data].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        setData(sortedDataA)

    }

    const handleCategoryClick = (e) => {
        setCategory(e.target.value)
        console.log(e.target.value);
    };

    return (
        <>
            <input
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={searchValue}
                className="search"
            />
            <button onClick={(e)=>handleClick(e)}>sort Z-A</button>
            <button onClick={(e)=>handleClickA(e)}>sort A-Z</button>

            

            <button onClick={(e)=>handleCategoryClick(e)} value="ALL">ALL</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="1">category id 2</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="2">category id 3</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="3">category id 4</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="4">category id 5</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="5">category id 6</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="6">category id 7</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="7">category id 8</button>
            <button onClick={(e)=>handleCategoryClick(e)} value="8">category id 9</button>
            <div className="row">
                {data &&
                    data.filter((item) => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
                    .filter((item)=>category === "ALL" || item.categoryId === parseInt(category))
                    .map((item) => (
                        <div className={`card ${data.display ? "block" : "none"}`} key={item.id }>
                            <div className="card-name">{item.name}</div>
                            <div className="card-quantityPerUnit">{item.quantityPerUnit}</div>
                            <div className="card-categoryId">{item.categoryId}</div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Section;
