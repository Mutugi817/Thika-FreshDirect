import { useState } from 'react'
import { assets } from '../assets/assets'

const Address = () => {

  // Input fields for address details
const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={ type } 
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
)



const handleChange = (e) => {
  const { name, value} = e.target;

  setAddress((prevAddress)=> ({
    ...prevAddress,
    [name]: value,
  }))
}

const onSubmitHandler = async (e) =>  {
  e.preventDefault();
}

  const [address, setAddress] = useState({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: '',
})
  return (
    <div className='mt-16 pb-16'>
        <p className="text-2xl md:text-3xl text-gray-500">Add Delivery <span className='font-semibold text-primary'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className="flex-1 max-w-md">
                <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField handleChange={handleChange} address={address} name="firstName" placeholder="First Name" type="text" />
                    <InputField handleChange={handleChange} address={address} name="lastName" placeholder="Last Name"  type="text" />
                  </div>
              
                    <InputField handleChange={handleChange} address={address} name="email" placeholder="Email address" type="text" />
                    <InputField handleChange={handleChange} address={address} name="street" placeholder="Street"  type="text" />
               
                  <div className="grid grid-cols-2 gap-4">
                    <InputField handleChange={handleChange} address={address} name="city" placeholder="City" type="text" />
                    <InputField handleChange={handleChange} address={address} name="state" placeholder="State"  type="text" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField handleChange={handleChange} address={address} name="zip-code" placeholder="Zip code" type="number" />
                    <InputField handleChange={handleChange} address={address} name="lastName" placeholder="Country"  type="text" />
                  </div>

                    <InputField handleChange={handleChange} address={address} name="phone" placeholder="Phone"  type="text" />
                    <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
                      Save address
                    </button>
                </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="add_address" />
        </div>
    </div>
  )
}

export default Address