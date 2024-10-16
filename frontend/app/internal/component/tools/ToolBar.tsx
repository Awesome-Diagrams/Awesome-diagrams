import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box, Circle, Text, G } from "@svgdotjs/svg.js";
import { SvgShapeDraggable } from "~/internal/svg/svgShape/svgShapeDraggable";
import { SquarePlus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DiagramProps {
    svgContainer: SvgContainerHandle | undefined;
}

export const ToolBar = ({ svgContainer }: DiagramProps) => {
    const [editingText, setEditingText] = useState<string | null>(null);  // Состояние для редактируемого текста
    const [currentTextElement, setCurrentTextElement] = useState<Text | null>(null);  // Ссылка на текущий текстовый элемент
    const [currentCircle, setCurrentCircle] = useState<Circle | null>(null);  // Ссылка на текущий круг
    const inputRef = useRef<HTMLInputElement | null>(null);  // Для ссылки на input
    const [inputPosition, setInputPosition] = useState({ left: 0, top: 0 });  // Для хранения позиции инпута
    const [originalText, setOriginalText] = useState<string>('');  // Для хранения оригинального текста

    const clickHandler = updateSvg(svgContainer, svg => {
        const constraints = new Box(0, 0, 1080, 720);

        // Создаем группу для объединения элементов
        const group = new G();

        // Создаем черный круг
        const shape = new Circle({ r: 50, cx: 100, cy: 100 }).fill('black');

        // Создаем текст и добавляем его в группу
        const text = new Text().plain('Click to edit').font({ fill: 'white', size: 16, anchor: 'middle' });

        // Центрируем текст относительно круга
        text.cx(shape.cx());
        text.cy(shape.cy());

        // Добавляем круг и текст в группу
        group.add(shape);
        group.add(text);

        // Добавляем группу в SVG
        svg.add(group);

        // Делаем группу draggable
        new SvgShapeDraggable(group, svg, constraints);

        // Обработчик клика по кругу
        text.on('click', () => {
            setEditingText(text.text());  // Устанавливаем текущее значение текста
            setOriginalText(text.text());  // Сохраняем оригинальный текст до редактирования
            setCurrentTextElement(text);  // Сохраняем текущий текстовый элемент
            setCurrentCircle(shape);  // Сохраняем ссылку на текущий круг

            // Получаем координаты круга относительно окна браузера
            const circleBox = shape.node.getBoundingClientRect();
            setInputPosition({
                left: circleBox.left + circleBox.width / 2,
                top: circleBox.top + circleBox.height / 2
            });

            setTimeout(() => inputRef.current?.focus(), 0);  // Фокусируем input после его рендеринга
        });
    });

    // Обработка завершения редактирования текста
    const handleInputBlur = () => {
        if (currentTextElement && editingText !== null) {
            currentTextElement.clear().plain(editingText);  // Обновляем текст в SVG
        }
        setEditingText(null);  // Закрываем режим редактирования
        setCurrentTextElement(null);  // Сбрасываем текущий элемент
        setCurrentCircle(null);  // Сбрасываем текущий круг
    };

    // Обработка отмены редактирования при нажатии Esc
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            // Если нажата клавиша Esc, сбрасываем текст к оригинальному и закрываем инпут
            if (currentTextElement) {
                currentTextElement.clear().plain(originalText);  // Возвращаем оригинальный текст в SVG
            }
            setEditingText(null);  // Закрываем режим редактирования
            setCurrentTextElement(null);  // Сбрасываем текущий элемент
            setCurrentCircle(null);  // Сбрасываем текущий круг
        } else if (e.key === 'Enter') {
            // Если нажата клавиша Enter, завершаем редактирование
            handleInputBlur();
        }
    };

    return (
        <div className="outline rounded-md ml-10">
            <div className="flex w-20 flex-col justify-center gap-10">
                <Button onClick={clickHandler} title="add shape">
                    <SquarePlus />
                </Button>
            </div>
            {editingText !== null && currentCircle && (
                <input
                    ref={inputRef}
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}  // Обновляем текст в состоянии
                    onBlur={handleInputBlur}  // Завершаем редактирование при потере фокуса
                    onKeyDown={handleInputKeyDown}  // Добавляем обработчик нажатий клавиш
                    className="absolute"
                    style={{
                        left: `${inputPosition.left}px`,  // Позиционируем инпут относительно страницы
                        top: `${inputPosition.top}px`,
                        width: `${currentCircle.attr('r') * 2}px`,  // Используем атрибут радиуса для расчета ширины
                        height: '24px',  // Высота инпута
                        transform: 'translate(-50%, -50%)',  // Центрируем инпут относительно его центра
                        textAlign: 'center',  // Текст по центру инпута
                        border: 'none',  // Без рамки
                        background: 'rgba(255, 255, 255, 0.8)',  // Полупрозрачный фон для инпута
                        outline: 'none',  // Убираем стандартный фокус инпута
                        padding: '4px',  // Внутренний отступ для лучшего отображения текста
                        borderRadius: '5px'  // Слегка скругленные углы
                    }}
                />
            )}
        </div>
    );
};
