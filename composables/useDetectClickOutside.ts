export const useDetectClickOutside = (
  component: Ref<EventTarget>,
  excludeComponent: Ref<EventTarget>,
  callback: () => void
) => {
  const listener = (event: MouseEvent) => {
    if (
      event.target === component.value ||
      event.composedPath().includes(component.value) ||
      event.target === excludeComponent.value ||
      event.composedPath().includes(excludeComponent.value)
    ) {
      return;
    }
    callback();
  };
  onMounted(() => {
    window.addEventListener("click", listener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
};
