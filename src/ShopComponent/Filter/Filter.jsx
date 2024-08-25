import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosConfig';
import { Checkbox, Radio } from 'antd';
import { Prices } from './FilterPrice';

// CheckboxList component for displaying a list of checkboxes
function Filter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('category/all');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post('product/product-filters', { checked, radio });
      onFilterChange(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
    filterProduct(); // Fetch products after updating filters
  };

  useEffect(() => {
    filterProduct();
  }, [checked, radio]);

  return (
    <>
      <div className=" ml-auto  mr-10 flex  ">
        <div className='bg-[#222222] h-[900px] w-[200px] '>
          <h1 className='text-[white] p-5 text-2xl'>Category</h1>
          <div className="flex flex-col ml-4">
            {categories?.map(category => (
              <Checkbox
                className='text-white text-[18px]'
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}>
                {category.name}
              </Checkbox>
            ))}
          </div>
          <h1 className='text-[white] p-5 text-2xl'>Price</h1>
          <div className="flex flex-col ml-4">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id} className="">
                  <Radio className="text-white text-[18px]" value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;

