import React, { useEffect, useState } from "react";
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

    return (
        <div className=" border-b py-2">
            <h2
                className="text-xl font-semibold text-slate-700"
                dangerouslySetInnerHTML={{ __html: props.value.question }}
            ></h2>
            <div className="flex gap-2 lg:flex-nowrap flex-wrap my-3">
                {allAnswer.sort().map((v, k) => {
                    return (
                        <div
                            key={k}
                            onClick={() => {
                                !props.checkAns && setSelected(v);
                                props.setAllClientAnswer((prev) => {
                                    prev[props.id] = {
                                        ...prev[props.id],
                                        isCollect:
                                            v === props.value.correct_answer
                                                ? true
                                                : false,
                                    };
                                    return prev;
                                });
                            }}
                            className={`rounded-xl border-2 py-1 px-5 cursor-pointer ${
                                v === selected && styleQue
                            }
              ${
                  props.checkAns && props.value.correct_answer === v
                      ? "bg-green-900 text-white border-none"
                      : "border-slate-700"
              }
              `}
                        >
                            {v}
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
                    data.results.map((obj) => ({ ...obj, isCollect: false }))
                );
            });
    }, []);

    return (
        <div className="main relative">
            <img
                src="/assets/blob 5.png"
                alt="blob 5"
                width={297}
                height={235}
                className="absolute hidden lg:block -right-20 top-0"
            />
            <img
                src="/assets/blob 5 (1).png"
                alt="blob 6"
                width={297}
                height={235}
                className="absolute -left-20 bottom-0 hidden lg:block"
            />
            <div className="flex justify-center items-center lg:h-screen relative overflow-x-hidden mx-auto">
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
                        <div className="flex gap-4 items-center w-fit m-auto">
                            <div className="text-lg">
                                You scored{" "}
                                {
                                    allClientAnswer.filter((v) => v.isCollect)
                                        .length
                                }
                                /5 correct answers
                            </div>
                            <button
                                onClick={() => {
                                    window.location.reload();
                                }}
                                className="bg-primary text-white px-8 pt-4 pb-5 text-2xl rounded-2xl mt-4 w-fit m-auto"
                            >
                                Play again
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setCheckAns(true);
                            }}
                            className="bg-primary text-xl w-full max-w-max mx-auto text-white px-8 pt-4 pb-5 rounded-2xl "
                        >
                            {data.length === 0
                                ? "please wait"
                                : "Check answers"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
