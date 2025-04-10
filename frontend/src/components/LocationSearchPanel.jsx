import React from 'react'

function LocationSearchPanel(props) {
  const submitHandler = (suggestion) => {
    props.onSelectSuggestion(suggestion);
  }
  
  return (
    <div className="bg-gray-900 text-white p-3 sm:p-4 rounded-lg">
      {/* Loading state */}
      {props.isLoading && (
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3">Searching locations...</span>
        </div>
      )}
      
      {/* No results state */}
      {!props.isLoading && props.suggestionList && props.suggestionList.length === 0 && (
        <div className="text-center py-6 text-gray-400">
          <i className="ri-search-line text-3xl mb-2"></i>
          <p>Type to search for locations</p>
          <p className="text-xs mt-1">Enter at least 3 characters</p>
        </div>
      )}
      
      {/* Display fetched suggestions */}
      {!props.isLoading && props.suggestionList && props.suggestionList.length > 0 && (
        <div className="max-h-[60vh] overflow-y-auto">
          {props.suggestionList.map((elem, idx) => (
            <div 
              key={idx} 
              onClick={() => submitHandler(elem)} 
              className='flex gap-4 border border-gray-700 p-3 hover:bg-gray-800 active:bg-gray-700 rounded-xl items-center my-2 cursor-pointer transition-colors'
            >
              <div className="flex-shrink-0">
                <div className='bg-gray-700 text-white h-10 w-10 flex items-center justify-center rounded-full'>
                  <i className="ri-map-pin-fill text-xl"></i>
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <h4 className='font-medium text-gray-200 truncate'>{elem}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationSearchPanel