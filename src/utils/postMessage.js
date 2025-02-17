const scriptTagBroadcaster = (event, formId, answerId, payload) => {
    const tagId = 'GIFS-SYNC';
    if (document.getElementById(tagId)) {
        document.getElementById(tagId).remove();
    }
    const script = document.createElement("script");
    script.id = tagId;
    script.type = "application/json";
    script.textContent = JSON.stringify(payload);
    script.setAttribute('data-answer_id', answerId);
    script.setAttribute('data-event', event);
    script.setAttribute('data-form_id', formId);
    document.body.appendChild(script);
};
const postMessageBroadcaster = (event, formId, answerId, payload) => {
    window.parent.postMessage({
        event,
        formId,
        answerId,
        payload: payload,
        source: 'GIFS-SYNC'
    }, '*'); // postMessage to parent

}
export const broadcastMessage = (
    event,
    formId,
    answerId,
    payload
) => {
    const handler = [postMessageBroadcaster, scriptTagBroadcaster]
    handler.forEach(
        (handler) => {
            handler(event, formId, answerId, payload);
        }
    );
}