import { ProjectMetadata } from '../../context/project'
import { Grid } from '../Grid'
import { Card } from './Card'

export const Layout = ({
    project,
}: {
    project: ProjectMetadata[]
}): React.ReactElement => {
    return (
        <Grid as="section" className="gap-8">
            {project?.length ? null : (
                <p className="col-span-full text-center">
                    No project available.
                </p>
            )}
            {project?.map(Card)}
        </Grid>
    )
}