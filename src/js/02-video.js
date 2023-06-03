import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new VimeoPlayer('vimeo-player');
const currentTimeKey = 'videoplayer-current-time';

// Обработчик события timeupdate для отслеживания времени воспроизведения
const handleTimeUpdate = throttle((event) => {
  const currentTime = event.seconds;
  localStorage.setItem(currentTimeKey, currentTime);
}, 1000); // Ограничение обновления времени воспроизведения не чаще, чем раз в секунду

// Инициализация плеера
player.ready().then(() => {
  // Восстановление времени воспроизведения при перезагрузке страницы
  const savedTime = localStorage.getItem(currentTimeKey);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }

  // Обработчик события timeupdate
  player.on('timeupdate', handleTimeUpdate);
});

