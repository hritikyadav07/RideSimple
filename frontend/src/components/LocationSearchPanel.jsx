import React from 'react'

function LocationSearchPanel(props) {

  const locations =[
    "123 Main St, Anytown, CA 12345",
    " 456 Elm St, Othertown, NY 67890",
    " 789 Oak St, Smallville, TX 34567",
    " 321 Maple St, Bigcity, FL 90123 ",
    "901 Pine St, Suburbia, IL 45678"
  ]
  function handleSuggestionClick() {
    props.setPanelOpen(false)
    props.setVehiclePanelOpen(true)
  }
  
  return (
    <div>
            {/* Display fetched suggestions */}
            {
                locations.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick()} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
  )
}

export default LocationSearchPanel