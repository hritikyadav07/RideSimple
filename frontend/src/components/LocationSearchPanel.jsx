import React from 'react'

function LocationSearchPanel(props) {
  // console.log('Suggestions:', props.suggestionList); 
  // Function to handle suggestion selection
  const submitHandler = (suggestion) => {
    props.onSelectSuggestion(suggestion)
    
  } 
  
  return (
    <div className="bg-gray-900 text-white p-2 rounded-lg">
      {/* Display fetched suggestions */}
      { props.suggestionList && props.suggestionList.length > 0 ? 
        props.suggestionList.map((elem, idx) => (
          <div 
            key={idx} 
            onClick={() => submitHandler(elem)} 
            className='flex gap-4 border-2 p-3 border-gray-700 active:border-white hover:bg-gray-800 rounded-xl items-center my-3 justify-start'
          >
            <h2 className='bg-gray-700 text-white h-8 flex items-center justify-center w-12 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium text-gray-200'>{elem}</h4>
          </div>
        ))
        : null
      }
    </div>
  )
}

export default LocationSearchPanel