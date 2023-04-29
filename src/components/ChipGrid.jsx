import { useRef, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import { findQuery } from '../pages/SearchPage';

function DecoratedChip({ query, isDuplicate, colorClass, queries, setQueries, duplicateQueries }) {
    const theme = useTheme()
    const chipRef = useRef(null)

    const ORIGINAL_BORDER_STYLE = `1px solid ${theme.palette.customColors[colorClass].main}`
    const ORIGINAL_BACKGROUND_COLOR = theme.palette.customColors[colorClass].bg
    const ORIGINAL_ICON_STYLE = {
        color: theme.palette.customColors[colorClass].main,
        "&:hover": {
            color: theme.palette.customColors[colorClass].hover
        },
        "&:active": {
            color: theme.palette.customColors[colorClass].pressed
        }
    }

    const [iconStyle, setIconStyle] = useState(ORIGINAL_ICON_STYLE)

    useEffect(() => {
        if (isDuplicate) {
            setTimeout(() => { 
                chipRef.current.style.border = `3px solid ${theme.palette.customColors.danger.main}`
                chipRef.current.style.backgroundColor = theme.palette.customColors.danger.bg
               setIconStyle({
                color: theme.palette.customColors.danger.main,
                "&:hover": {
                    color: theme.palette.customColors.danger.hover
                },
                "&:active": {
                    color: theme.palette.customColors.danger.pressed
                }
            })
            }, 0); 
            setTimeout(() => { 
                chipRef.current.style.border = ORIGINAL_BORDER_STYLE
                chipRef.current.style.backgroundColor = ORIGINAL_BACKGROUND_COLOR
                setIconStyle(ORIGINAL_ICON_STYLE)
            }, 2000)
        }
    }, [duplicateQueries])

    return (
        <Chip
            ref={chipRef}
            sx={{ 
                backgroundColor: ORIGINAL_BACKGROUND_COLOR, 
                border: ORIGINAL_BORDER_STYLE, 
                borderRadius: "50px", 
                "& .MuiChip-deleteIcon": iconStyle,
            }}
            label={query}
            onDelete={() => {
                setQueries(queries.filter((q) => q !== query))
            }}
        />
    )
}

function ChipGrid({ queries, duplicateQueries, colorClass, setQueries }) {
    return (
        queries.map((query, index) => {
            const isDuplicate = findQuery(duplicateQueries, query) !== undefined

            return (
                <Grid item key={index}>
                    <DecoratedChip query={query} isDuplicate={isDuplicate} colorClass={colorClass} queries={queries} setQueries={setQueries} duplicateQueries={duplicateQueries} />
                </Grid>
            )
        })
    )
}

export default ChipGrid