const SVGProfile = (props) => { 
    return (
        <svg
            width={24}
            height={24}
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
        <path
            d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </svg>
    )
}

export default SVGProfile