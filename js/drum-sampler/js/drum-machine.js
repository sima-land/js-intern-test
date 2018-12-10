
function startPlay(e) {
    var audioTarget, btnTarget;

    document.querySelectorAll('audio').forEach(item => {
        item.dataset.key == e.keyCode ? audioTarget = item : undefined;
    });

    document.querySelectorAll('.key').forEach(item => {
        item.dataset.key == e.keyCode ? btnTarget = item : undefined;
    });

    if (audioTarget !== undefined && btnTarget !== undefined) {
        audioTarget.play();
        audioTarget.currentTime = 0;

        btnTarget.classList.add('scaled');

        setTimeout(() => {
            btnTarget.classList.remove('scaled');
        }, 120);
    }
};

document.getElementsByTagName('body')[0].onkeydown = startPlay;



// Сначала сделал с jQuery, потом увидел, что её использование избыточно.

// function startPlay(e) {

//     var audioTarget, btnTarget;

//     var dataKey = e.keyCode;
//     var audioTarget = $('body').find('audio[data-key=' + dataKey + ']')[0];

//     var btnTarget = $('body').find('.key[data-key=' + dataKey + ']')[0];

//     audioTarget.play();
//     audioTarget.currentTime = 0;

//     btnTarget.classList.add('scaled');
//     setTimeout(() => {
//         btnTarget.classList.remove('scaled');
//     }, 100);

// };

// $('body').on('keydown', startPlay);