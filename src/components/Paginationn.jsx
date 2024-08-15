import { Pagination } from 'flowbite-react';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="m-auto flex justify-center mb-10 mt-5 bg-transparent">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages} 
                onPageChange={onPageChange}
                className="bg-transparent text-[#87CEEB]"
                renderPagination={() => (
                    <nav>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-2 py-2 bg-transparent text-[#87CEEB] hover:bg-black hover:text-white"
                                >
                                    &lt;
                                </button>
                            </li>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => onPageChange(index + 1)}
                                        className={`px-4 py-2 ${
                                            currentPage === index + 1
                                                ? 'bg-black text-[#87CEEB] w-[32px] h-[32px]'
                                                : 'bg-transparent text-[#87CEEB] hover:bg-black hover:text-white'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-2 py-2 bg-transparent text-[#87CEEB] hover:bg-black hover:text-white"
                                >
                                    &gt;
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            />
        </div>
    );
};

export default CustomPagination;
