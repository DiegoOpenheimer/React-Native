
export default abstract class Color {

    static primaryColor: string = 'rgba(158, 65, 15, 1)'
    static transparent: string = 'rgba(0,0,0,0)'
    static white: string = '#FFF'
    static gray: string = '#cecece'
    static black: string = '#000'
    static whiteWithOpactiy(value: number): string {
        return `rgba(255, 255, 255, ${value})`
    }
    static primaryColorWithOpactiy(value: number): string {
        return `rgba(158, 65, 15, ${value})`
    }
    
}