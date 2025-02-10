const Question = ({
    question,
    options,
    correctAnswer,
    onAnswer,
    selectedAnswer,
}) => {
    return (
        <div>
            <h2>{question}</h2>
            <div className="options">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-btn ${
                            selectedAnswer
                                ? option === correctAnswer
                                    ? 'correct'
                                    : option === selectedAnswer
                                    ? 'incorrect'
                                    : ''
                                : ''
                        }`}
                        onClick={() => onAnswer(option)}
                        disabled={selectedAnswer !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
