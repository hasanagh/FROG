// @flow

import { compact } from 'lodash';

export const exportData = (config: Object, { payload }: Object) => {
  const csv = Object.keys(payload).map(instanceId => {
    const data = payload[instanceId].data;
    if (data) {
      return [
        instanceId,
        ...(data.answersIndex || config.questions.map(_ => -1)),
        ...(data.answers || config.questions.map(_ => undefined))
      ].join('\t');
    }
    return undefined;
  });

  const headers = [
    'instanceId',
    ...config.questions.map((_, qIndex) => 'Q' + qIndex + ' (index)'),
    ...config.questions.map((_, qIndex) => 'Q' + qIndex + ' (text)')
  ].join('\t');
  return compact([headers, ...csv.sort()]).join('\n');
};

export const formatProduct = (config: Object, item: Object) => {
  if (item) {
    const questions = config.questions.map(q => q.question);
    const answers = config.questions.map(
      (q, qIndex) =>
        item[qIndex] !== undefined ? q.answers[item[qIndex]].choice : undefined
    );
    const answersIndex = config.questions.map(
      (q, qIndex) => (item[qIndex] !== undefined ? item[qIndex] : -1)
    );
    const correctQs = config.hasAnswers
      ? config.questions.map(
          (q, qIndex) =>
            item[qIndex] !== undefined && !!q.answers[item[qIndex]].isCorrect
        )
      : undefined;
    const correctCount = correctQs
      ? correctQs.filter(x => x).length
      : undefined;
    const maxCorrect = questions.length;

    return {
      questions,
      answers,
      answersIndex,
      correctQs,
      correctCount,
      maxCorrect
    };
  }
};
