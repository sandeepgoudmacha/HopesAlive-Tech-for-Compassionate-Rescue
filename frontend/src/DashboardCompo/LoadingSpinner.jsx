function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-orange-200 animate-spin border-t-orange-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-500 animate-pulse" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;