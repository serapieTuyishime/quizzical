import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Question = (props) => {
    const allAnswer = [
        ...props.value.incorrect_answers,
        props.value.correct_answer,
    ];
    const [selected, setSelected] = useState(null);
    let styleQue = props.checkAns
        ? selected === props.value.correct_answer
            ? "bg-green-900  text-white border-none"
            : "bg-red-900  text-white border-none opacity-50"
        : "bg-violet-200 text-slate-700 border-none";
    function storeUserChoice(answer) {
        !props.checkAns && setSelected(answer);
        props.setAllClientAnswer((prev) => {
            prev[props.id] = {
                ...prev[props.id],
                isCollect: answer === props.value.correct_answer ? true : false,
            };
            return prev;
        });
    }

    return (
        <div className="py-2 border-b ">
            <h2
                className="text-xl font-semibold text-slate-700"
                dangerouslySetInnerHTML={{ __html: props.value.question }}
            ></h2>
            <div className="flex flex-wrap gap-2 my-3 lg:flex-nowrap">
                {allAnswer.sort().map((answer, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => storeUserChoice(answer)}
                            className={`rounded-xl border-2 py-1 px-5 cursor-pointer ${
                                answer === selected && styleQue
                            }
              ${
                  props.checkAns && props.value.correct_answer === answer
                      ? "bg-green-900 text-white border-none"
                      : "border-slate-700"
              }
              `}
                        >
                            {answer}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default function Questions() {
    const [data, setData] = useState([]);
    const [countCorrect, setCountCorrect] = useState(0);
    const [checkAns, setCheckAns] = useState(false);
    const [allClientAnswer, setAllClientAnswer] = useState(data);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then((res) => res.json())
            .then((data) => {
                setData(data.results);
                setAllClientAnswer(
                    data.results.map((obj) => ({
                        ...obj,
                        isCollect: false,
                    }))
                );
            });
    }, []);

    return (
        <div className="w-full h-full main">
            <img
                src="/assets/blob 5.png"
                alt="blob 5"
                width={297}
                height={235}
                className="absolute top-0 right-0 hidden lg:block"
            />
            <img
                src="/assets/blob 5 (1).png"
                alt="blob 6"
                width={297}
                height={235}
                className="absolute bottom-0 left-0 hidden lg:block"
            />
            <div className="relative flex items-center justify-center mx-auto overflow-x-hidden lg:h-screen">
                <div className="flex flex-col gap-3 ">
                    {data.map((v, k) => {
                        return (
                            <Question
                                value={v}
                                key={k}
                                setCountCorrect={setCountCorrect}
                                countCorrect={countCorrect}
                                checkAns={checkAns}
                                id={k}
                                allClientAnswer={allClientAnswer}
                                setAllClientAnswer={setAllClientAnswer}
                            />
                        );
                    })}
                    {checkAns ? (
                        <div className="flex items-center gap-4 m-auto w-fit">
                            <div className="text-lg">
                                You scored{" "}
                                {
                                    allClientAnswer.filter((v) => v.isCollect)
                                        .length
                                }
                                /5 correct answers
                            </div>
                            <Link
                                to="/"
                                className="px-8 pt-2 pb-3 m-auto text-2xl text-white bg-primary rounded-2xl w-fit"
                            >
                                Play again
                            </Link>
                        </div>
                    ) : data.length === 0 ? (
                        <label className="w-full px-8 pt-4 pb-5 mx-auto text-xl text-white bg-primary max-w-max rounded-2xl ">
                            Please wait
                        </label>
                    ) : (
                        <button
                            onClick={() => {
                                setCheckAns(true);
                            }}
                            className="w-full px-8 pt-4 pb-5 mx-auto text-xl text-white bg-primary max-w-max rounded-2xl "
                        >
                            Check answers
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
